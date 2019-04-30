import React from 'react';

import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Start from './components/Start';
import Search from './components/Search/SearchContainer';

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
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/start" component={Start} />
        <Route exact path="/search/:type_search" component={Search} />
      </Switch>
    </div>
  );
}

export default App;
