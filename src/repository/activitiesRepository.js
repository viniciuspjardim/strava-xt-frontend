import Repository from './Repository';

const resource = '/activities';
export default {
  get() {

  },
  getActivity(activityId) {
    return Repository.get(`${resource}/${activityId}`);
  }
}