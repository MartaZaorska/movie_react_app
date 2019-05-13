import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../sass/navbar.scss';

function Navbar({ closeMenu }){
  return (
    <nav className="navbar">
      <section className="navbar_item_movies navbar_item">
        <header>
          <h1 className="navbar_item_title">FILMY</h1>
        </header>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/search/movie" onClick={closeMenu}>Wyszukiwarka</Link></li>
          <li className="navbar_list_item"><Link to="/now_playing/movie" onClick={closeMenu}>W kinach</Link></li>
          <li className="navbar_list_item"><Link to="/ranking/movie" onClick={closeMenu}>Ranking</Link></li>
        </ul>
      </section>
      <section className="navbar_item_serials navbar_item">
        <header>
          <h1 className="navbar_item_title">SERIALE</h1>
        </header>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/search/tv" onClick={closeMenu}>Wyszukiwarka</Link></li>
          <li className="navbar_list_item"><Link to="/now_playing/tv" onClick={closeMenu}>Najbliższe premiery</Link></li>
          <li className="navbar_list_item"><Link to="/ranking/tv" onClick={closeMenu}>Ranking</Link></li>
        </ul>
      </section>
      <section className="navbar_item_people navbar_item">
        <header>
          <h1 className="navbar_item_title">LUDZIE</h1>
        </header>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/search/person" onClick={closeMenu}>Wyszukiwarka</Link></li>
          <li className="navbar_list_item"><Link to="/ranking/person" onClick={closeMenu}>Popularni</Link></li>
        </ul>
      </section>
      <section className="navbar_item_extra navbar_item">
        <header>
          <h1 className="navbar_item_title">EXTRA</h1>
        </header>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/extra" onClick={closeMenu}>Ulubione</Link></li>
          <li className="navbar_list_item"><Link to="/extra" onClick={closeMenu}>Chcę zobaczyć</Link></li>
          <li className="navbar_list_item"><Link to="/contact" onClick={closeMenu}>Kontakt</Link></li>
        </ul>
      </section>
    </nav>
  );
} 

Navbar.propTypes = {
  closeMenu: PropTypes.func.isRequired
};

export default Navbar;