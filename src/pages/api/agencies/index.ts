import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { agencyValidationSchema } from 'validationSchema/agencies';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getAgencies();
    case 'POST':
      return createAgency();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getAgencies() {
    const data = await prisma.agency
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'agency'));
    return res.status(200).json(data);
  }

  async function createAgency() {
    await agencyValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.project?.length > 0) {
      const create_project = body.project;
      body.project = {
        create: create_project,
      };
    } else {
      delete body.project;
    }
    if (body?.seo_service?.length > 0) {
      const create_seo_service = body.seo_service;
      body.seo_service = {
        create: create_seo_service,
      };
    } else {
      delete body.seo_service;
    }
    if (body?.team_member?.length > 0) {
      const create_team_member = body.team_member;
      body.team_member = {
        create: create_team_member,
      };
    } else {
      delete body.team_member;
    }
    if (body?.technology?.length > 0) {
      const create_technology = body.technology;
      body.technology = {
        create: create_technology,
      };
    } else {
      delete body.technology;
    }
    const data = await prisma.agency.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
