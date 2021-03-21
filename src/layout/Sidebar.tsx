import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.global.scss';

export default function Sidebar() {
  return (
    <aside
      className="menu"
      style={{ backgroundColor: 'lightGray', height: '100vh' }}
    >
      <ul className="menu-list">
        <li>
          <NavLink activeClassName="activeClass" to="/calendar">
            <span className="icon-text">
              <span className="icon">
                <i className="fas fa-calendar-alt" />
              </span>
              <span>Kalendarz</span>
            </span>
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="activeClass" to="/example">
            Example2
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="activeClass" to="/workerConfig">
            User Config Form
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
