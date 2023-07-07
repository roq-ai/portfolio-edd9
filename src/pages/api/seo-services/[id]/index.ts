import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { seoServiceValidationSchema } from 'validationSchema/seo-services';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.seo_service
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getSeoServiceById();
    case 'PUT':
      return updateSeoServiceById();
    case 'DELETE':
      return deleteSeoServiceById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getSeoServiceById() {
    const data = await prisma.seo_service.findFirst(convertQueryToPrismaUtil(req.query, 'seo_service'));
    return res.status(200).json(data);
  }

  async function updateSeoServiceById() {
    await seoServiceValidationSchema.validate(req.body);
    const data = await prisma.seo_service.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteSeoServiceById() {
    const data = await prisma.seo_service.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
