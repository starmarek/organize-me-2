import api from './api';

export default {
  fetchShiftEvents(rangeStart, rangeEnd) {
    return api
      .get(`shifts/events?start=${rangeStart}&end=${rangeEnd}`, {
        params: { calendar_specific: true },
      })
      .then((response) => response.data);
  },
};
