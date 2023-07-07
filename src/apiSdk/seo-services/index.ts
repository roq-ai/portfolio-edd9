import axios from 'axios';
import queryString from 'query-string';
import { SeoServiceInterface, SeoServiceGetQueryInterface } from 'interfaces/seo-service';
import { GetQueryInterface } from '../../interfaces';

export const getSeoServices = async (query?: SeoServiceGetQueryInterface) => {
  const response = await axios.get(`/api/seo-services${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSeoService = async (seoService: SeoServiceInterface) => {
  const response = await axios.post('/api/seo-services', seoService);
  return response.data;
};

export const updateSeoServiceById = async (id: string, seoService: SeoServiceInterface) => {
  const response = await axios.put(`/api/seo-services/${id}`, seoService);
  return response.data;
};

export const getSeoServiceById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/seo-services/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSeoServiceById = async (id: string) => {
  const response = await axios.delete(`/api/seo-services/${id}`);
  return response.data;
};
