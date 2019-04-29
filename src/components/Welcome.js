import React from 'react';
import { Link } from 'react-router-dom';

import '../sass/welcome.scss';

function Welcome(){

  React.useEffect(() => {
    document.querySelector('.welcome_container').classList.add('enter');
  }, []);

  return (
    <div className="welcome_container">
      <div className="welcome_background"></div>
      <div className="welcome_content">
        <h1 className="welcome_title">MOVIE APP</h1>
        <button className="welcome_button"><Link to="/start">Zaczynamy</Link></button>
      </div>
    </div>
  );
}

export default Welcome;