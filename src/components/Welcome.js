import React from 'react';
import { Link } from 'react-router-dom';

import '../sass/welcome.scss';

function Welcome(){

  React.useEffect(() => {
    document.querySelector('.welcome_container').classList.add('enter');
  }, []);

  return (
    <article className="welcome_container">
      <header className="welcome_content">
        <h1 className="welcome_title">MOVIE APP</h1>
        <Link to="/start" className="welcome_button">Zaczynamy</Link>
      </header>
      <section className="welcome_background"></section>
    </article>
  );
}

export default Welcome;