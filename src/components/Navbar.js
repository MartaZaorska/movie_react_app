import React from 'react';

import { Link } from 'react-router-dom';

import '../sass/navbar.scss';

function Navbar(props){
  return (
    <nav className="navbar">
      <section className="movies navbar_item">
        <header>
          <h1 className="navbar_item_title">FILMY</h1>
        </header>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/search/movie" onClick={props.closeMenu}>Wyszukiwarka</Link></li>
          <li className="navbar_list_item"><Link to="/now_playing/movie" onClick={props.closeMenu}>W kinach</Link></li>
          <li className="navbar_list_item"><Link to="/ranking/movie" onClick={props.closeMenu}>Ranking</Link></li>
        </ul>
      </section>
      <section className="serials navbar_item">
        <header>
          <h1 className="navbar_item_title">SERIALE</h1>
        </header>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/search/tv" onClick={props.closeMenu}>Wyszukiwarka</Link></li>
          <li className="navbar_list_item"><Link to="/now_playing/tv" onClick={props.closeMenu}>Najbliższe premiery</Link></li>
          <li className="navbar_list_item"><Link to="/ranking/tv" onClick={props.closeMenu}>Ranking</Link></li>
        </ul>
      </section>
      <section className="people navbar_item">
        <header>
          <h1 className="navbar_item_title">LUDZIE</h1>
        </header>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/search/person" onClick={props.closeMenu}>Wyszukiwarka</Link></li>
          <li className="navbar_list_item"><Link to="/ranking/person" onClick={props.closeMenu}>Popularni</Link></li>
        </ul>
      </section>
      <section className="extra navbar_item">
        <header>
          <h1 className="navbar_item_title">EXTRA</h1>
        </header>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/extra/favourite" onClick={props.closeMenu}>Ulubione</Link></li>
          <li className="navbar_list_item"><Link to="/extra/want_see" onClick={props.closeMenu}>Chcę zobaczyć</Link></li>
          <li className="navbar_list_item"><Link to="/contact" onClick={props.closeMenu}>Kontakt</Link></li>
        </ul>
      </section>
    </nav>
  );
} 

export default Navbar;