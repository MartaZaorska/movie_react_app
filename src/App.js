import React from 'react';

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Start from './components/Start';

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/start" component={Start} />
      </Switch>
    </div>
  );
}

export default App;
