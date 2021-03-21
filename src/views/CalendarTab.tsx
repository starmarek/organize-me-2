import React from 'react';
import Calendar from '../components/Calendar';

export default function CalendarTab() {
  return (
    <div>
      <div className="buttons">
        <button className="button is-primary" type="button">
          Primary
        </button>
        <button className="button is-link" type="button">
          Link
        </button>
      </div>
      <Calendar />
    </div>
  );
}
