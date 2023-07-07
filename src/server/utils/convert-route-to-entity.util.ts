const mapping: Record<string, string> = {
  agencies: 'agency',
  projects: 'project',
  'seo-services': 'seo_service',
  'team-members': 'team_member',
  technologies: 'technology',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
