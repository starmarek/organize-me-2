import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/App.global.scss';
import UserConfigForm from './components/user/UserConfigForm';

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
        <Route path="/" component={UserConfigForm} />
      </Switch>
    </Router>
  );
}
