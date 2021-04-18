import api from './api';

export default {
  fetchWorkers() {
    return api.get('workers/').then((response) => response.data);
  },

  addWorker(payload) {
    return api.post('workers/', payload).then((response) => response.data);
  },

  updateWorker(update) {
    return api
      .put(`workers/${update.id}`, update.payload)
      .then((response) => response.data);
  },

  deleteWorker(id) {
    return api.delete(`workers/${id}`).then((response) => response.data);
  },
};
