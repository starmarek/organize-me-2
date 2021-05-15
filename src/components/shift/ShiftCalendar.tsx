import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import shiftCalendarApi from '../../api/shiftCalendarAPI';
import '../../styles/ShiftCalendar.global.scss';

moment.locale('pl');
const localizer = momentLocalizer(moment);
// TODO CHECK THIS https://github.com/jquense/react-big-calendar/issues/428
const ShiftCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    shiftCalendarApi
      .fetchShiftEvents(
        moment().format('YYYY-MM-DD_H:mm:ss'),
        moment().add(7, 'days').format('YYYY-MM-DD_H:mm:ss')
      )
      .then((fetchedEvents) => setEvents(fetchedEvents))
      .catch((err) => {
        throw err;
      });
  }, []);
  return (
    <div style={{ height: '50vh' }}>
      <Calendar localizer={localizer} events={events} />
    </div>
  );
};

export default ShiftCalendar;
