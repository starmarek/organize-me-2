import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Sidebar from './layout/Sidebar';
import Example from './views/Example';
import Example2 from './views/Example2';
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
            <Route exact path="/" component={Example} />
            <Route path="/example" component={Example2} />
            <Route path="/workerConfig" component={WorkerConfigForm} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
