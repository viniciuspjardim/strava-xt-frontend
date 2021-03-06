import Repository from './Repository';

const resource = '/activities';
export default {
  get(config) {
    return Repository.get(`${resource}`, config);
  },
  getActivity(activityId, config) {
    return Repository.get(`${resource}/${activityId}`, config);
  }
}