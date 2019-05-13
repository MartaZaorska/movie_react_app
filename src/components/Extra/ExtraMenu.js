import React from 'react';
import { Link } from 'react-router-dom';

import { smoothScroll, toggleSideMenu } from '../../extra';

import '../../sass/sidemenu.scss';

function ExtraMenu(){
  return (
    <React.Fragment>
      <nav className="side_navbar">
        <ul className="side_navbar_list">
          <li className="list_item muted">Użytkownik</li>
          <li className="list_item title">Ekstra</li>
          <li className="list_item_link" onClick={() => smoothScroll('extra_favourite')}>Ulubione</li>
          <li className="list_item_link" onClick={() => smoothScroll('extra_wantsee')}>Chcę zobaczyć</li>
          <li className="list_item_link"><Link to="/contact">Kontakt</Link></li>
          <span className="line"></span>
          <li className="list_item_link"><Link to="/search/multi">Wyszukiwarka</Link></li>
          <li className="list_item_link"><Link to="/ranking/movie">Ranking filmów</Link></li>
          <li className="list_item_link"><Link to="/ranking/tv">Ranking seriali</Link></li>
          <li className="list_item_link"><Link to="/ranking/person">Ranking osób kina</Link></li>
        </ul>
      </nav>
      <i onClick={toggleSideMenu} className="open_side_menu fas fa-angle-right"></i>
    </React.Fragment>
  )
}

export default ExtraMenu;