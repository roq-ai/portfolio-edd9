import { ProjectInterface } from 'interfaces/project';
import { SeoServiceInterface } from 'interfaces/seo-service';
import { TeamMemberInterface } from 'interfaces/team-member';
import { TechnologyInterface } from 'interfaces/technology';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AgencyInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  project?: ProjectInterface[];
  seo_service?: SeoServiceInterface[];
  team_member?: TeamMemberInterface[];
  technology?: TechnologyInterface[];
  user?: UserInterface;
  _count?: {
    project?: number;
    seo_service?: number;
    team_member?: number;
    technology?: number;
  };
}

export interface AgencyGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
