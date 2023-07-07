import { AgencyInterface } from 'interfaces/agency';
import { GetQueryInterface } from 'interfaces';

export interface TechnologyInterface {
  id?: string;
  name: string;
  agency_id?: string;
  created_at?: any;
  updated_at?: any;

  agency?: AgencyInterface;
  _count?: {};
}

export interface TechnologyGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  agency_id?: string;
}
