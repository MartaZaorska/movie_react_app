import React from 'react';

import Navbar from './components/Navbar';
import Start from './components/Start';
import Welcome from './components/Welcome';
import Search from './components/Search';
import Extra from './components/Extra';
import Contact from './components/Contact';
import Ranking from './components/Ranking';
import Screen from './components/Screen';
import Realization from './components/Realization';
import Person from './components/Person';

import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="container">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/upcoming" component={Start} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/search/:type_search" component={Search} />
        <Route exact path="/extra/:type_extra" component={Extra} />
        <Route exact path="/ranking/:type_media" component={Ranking} />
        <Route exact path="/screen/:type_screen" component={Screen} />
        <Route exact path="/realization/:type_media/:media_id" component={Realization} />
        <Route exact path="/person/:id" component={Person} />
      </Switch>
    </div>
  );
}

export default App;
