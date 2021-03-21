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
          <NavLink exact activeClassName="activeClass" to="/">
            Example
          </NavLink>
        </li>
        <li>
          <NavLink activeClassName="activeClass" to="/example">
            Example2
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}
