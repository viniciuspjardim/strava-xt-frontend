import activitiesRepository from './activitiesRepository';

const repositories = {
  activities: activitiesRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};