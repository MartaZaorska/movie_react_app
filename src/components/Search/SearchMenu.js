import React from 'react';
import { Link } from 'react-router-dom';

import { toggleSideMenu } from '../../extra';

import '../../sass/sidemenu.scss';

function SearchMenu(){

  return (
    <React.Fragment>
      <nav className="side_navbar search_side_navbar">
        <ul className="side_navbar_list">
          <li className="list_item title">Wyszukiwarka</li>
          <li className="list_item_link"><Link to="/ranking/movie">Ranking filmów</Link></li>
          <li className="list_item_link"><Link to="/ranking/tv">Ranking seriali</Link></li>
          <li className="list_item_link"><Link to="/ranking/person">Ranking osób kina</Link></li>
          <span className="line"></span>
          <li className="list_item_link"><Link to="/extra">Ulubione</Link></li>
          <li className="list_item_link"><Link to="/extra">Chcę zobaczyć</Link></li>
          <li className="list_item_link"><Link to="/contact">Kontakt</Link></li>
        </ul>
      </nav>
      <i onClick={toggleSideMenu} className="open_side_menu search_open_side_menu fas fa-angle-right"></i>
    </React.Fragment>
  )
}

export default SearchMenu;