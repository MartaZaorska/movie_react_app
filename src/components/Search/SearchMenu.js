import React from 'react';
import { Link } from 'react-router-dom';

import '../../sass/sidemenu.scss';

function SearchMenu(){

  const toggleSideMenu = () => {
    const sideMenu = document.querySelector('.open_side_menu');
    sideMenu.classList.toggle('fa-angle-right');
    sideMenu.classList.toggle('fa-angle-left');
    sideMenu.classList.toggle('active');
    document.querySelector('.side_navbar').classList.toggle('open_menu');
  }

  return (
    <React.Fragment>
      <nav className="side_navbar search_side_navbar">
        <ul className="side_navbar_list">
          <li className="list_item title">Wyszukiwarka</li>
          <li className="list_item_link"><Link to="/ranking/movie">Ranking filmów</Link></li>
          <li className="list_item_link"><Link to="/ranking/tv">Ranking seriali</Link></li>
          <li className="list_item_link"><Link to="/ranking/person">Ranking osób kina</Link></li>
          <span className="line"></span>
          <li className="list_item_link"><Link to="/extra/favourite">Ulubione</Link></li>
          <li className="list_item_link"><Link to="/extra/want_see">Chcę zobaczyć</Link></li>
        </ul>
      </nav>
      <i onClick={toggleSideMenu} className="open_side_menu search_open_side_menu fas fa-angle-right"></i>
    </React.Fragment>
  )
}

export default SearchMenu;