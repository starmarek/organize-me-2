import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import '../styles/ShiftCalendar.global.scss';

moment.locale('pl');
const localizer = momentLocalizer(moment);

export default function ShiftCalendar() {
  return (
    <div style={{ height: '50vh' }}>
      <Calendar
        localizer={localizer}
        events={[
          {
            title: 'All Day Event very long title',
            allDay: true,
            start: new Date(2021, 0, 0),
            end: new Date(2021, 0, 1),
          },
          {
            title: 'Long Event',
            start: new Date(2021, 4, 7),
            end: new Date(2021, 4, 10),
          },
        ]}
      />
    </div>
  );
}
