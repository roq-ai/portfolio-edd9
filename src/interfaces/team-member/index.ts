import { AgencyInterface } from 'interfaces/agency';
import { GetQueryInterface } from 'interfaces';

export interface TeamMemberInterface {
  id?: string;
  name: string;
  role: string;
  agency_id?: string;
  created_at?: any;
  updated_at?: any;

  agency?: AgencyInterface;
  _count?: {};
}

export interface TeamMemberGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  role?: string;
  agency_id?: string;
}
