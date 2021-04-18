import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import CalendarTab from './views/CalendarTab';
import WorkerConfigForm from './components/worker/WorkerConfigForm';
import './styles/App.global.scss';

export default function App() {
  return (
    <Router>
      <div className="columns is-gapless">
        <div className="column is-one-quarter">
          <Sidebar />
        </div>
        <div className="column">
          <Switch>
            <Route path="/calendar" component={CalendarTab} />
            <Route path="/workerConfig" component={WorkerConfigForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
