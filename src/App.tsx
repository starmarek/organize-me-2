import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import icon from '../assets/icon.svg';
import './styles/App.global.scss';

const Hello = () => {
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
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Hello} />
      </Switch>
    </Router>
  );
}
