import Repository from './Repository';

const resource = '/auth';
export default {
  get(config) {
    return Repository.get(`${resource}`, config);
  },
  getLogin(config) {
    return Repository.get(`${resource}/stravalogin`, config);
  }
}