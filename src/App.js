import React from 'react';

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Start from './components/Start';
import Search from './components/Search';
import NowPlaying from './components/NowPlaying';
import Ranking from './components/Ranking';
import Realization from './components/Realization';
import Person from './components/Person';
import Extra from './components/Extra';
import Contact from './components/Contact';

import { Switch, Route } from 'react-router-dom';

function App() {

  const toggleClassMenu = methodName => {
    document.querySelector('.menu_icon').classList[methodName]('menu_icon_close');
    document.querySelector('.navbar').classList[methodName]('navbar_open');
  }

  const toggleMenu = e => {
    e.preventDefault();
    if(e.target.classList.contains('menu_icon_close')){
      toggleClassMenu('remove');
    }else{
      toggleClassMenu('add');
    }
  }

  return (
    <div className="container">
      <button className="menu_icon" onClick={e => toggleMenu(e)}>
        <span className="menu_icon_item"></span>
        <span className="menu_icon_item"></span>
        <span className="menu_icon_item"></span>
      </button>
      <Navbar closeMenu={() => toggleClassMenu('remove')} />
      <main>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route exact path="/start" component={Start} />
          <Route exact path="/search/:type_search" component={Search} />
          <Route exact path="/now_playing/:type_media" component={NowPlaying} />
          <Route exact path="/ranking/:type_media" component={Ranking} />
          <Route exact path="/realization/:type_media/:id" component={Realization} />
          <Route exact path="/person/:id" component={Person} />
          <Route exact path="/extra" component={Extra} />
          <Route exact path="/contact" component={Contact} />
          <Route component={Welcome} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
