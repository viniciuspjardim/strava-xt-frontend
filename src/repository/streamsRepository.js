import Repository from './Repository';

const resource = '/streams/activity';
export default {
  getAltitude(activityId, config) {
    return Repository.get(`${resource}/${activityId}`, config);
  }
}