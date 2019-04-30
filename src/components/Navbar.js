import React from 'react';

import { Link } from 'react-router-dom';
import Context from '../context';

import '../sass/navbar.scss';

function Navbar(props){
  return (
    <nav className="navbar">
      <div className="movies navbar_item">
        <h1 className="navbar_item_title">FILMY</h1>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/search/movie" onClick={props.closeMenu}>Wyszukiwarka</Link></li>
          <li className="navbar_list_item"><Link to="/screen/movie" onClick={props.closeMenu}>W kinach</Link></li>
          <li className="navbar_list_item"><Link to="/ranking/movie" onClick={props.closeMenu}>Ranking</Link></li>
        </ul>
      </div>
      <div className="serials navbar_item">
        <h1 className="navbar_item_title">SERIALE</h1>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/search/tv" onClick={props.closeMenu}>Wyszukiwarka</Link></li>
          <li className="navbar_list_item"><Link to="/screen/tv" onClick={props.closeMenu}>Najbliższe premiery</Link></li>
          <li className="navbar_list_item"><Link to="/ranking/tv" onClick={props.closeMenu}>Ranking</Link></li>
        </ul>
      </div>
      <div className="people navbar_item">
        <h1 className="navbar_item_title">LUDZIE</h1>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/search/person" onClick={props.closeMenu}>Wyszukiwarka</Link></li>
          <li className="navbar_list_item"><Link to="/ranking/person" onClick={props.closeMenu}>Popularni</Link></li>
        </ul>
      </div>
      <div className="extra navbar_item">
        <h1 className="navbar_item_title">EXTRA</h1>
        <ul className="navbar_list">
          <li className="navbar_list_item"><Link to="/extra/favourite" onClick={props.closeMenu}>Ulubione</Link></li>
          <li className="navbar_list_item"><Link to="/extra/want_see" onClick={props.closeMenu}>Chcę zobaczyć</Link></li>
          <li className="navbar_list_item"><Link to="/contact" onClick={props.closeMenu}>Kontakt</Link></li>
        </ul>
      </div>
    </nav>
  );
} 

export default Navbar;