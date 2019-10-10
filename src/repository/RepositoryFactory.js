import authRepository from './authRepository';
import activitiesRepository from './activitiesRepository';
import streamsRepository from './streamsRepository';

const repositories = {
  auth: authRepository,
  activities: activitiesRepository,
  streams: streamsRepository
};

export const RepositoryFactory = {
  get: name => repositories[name]
};