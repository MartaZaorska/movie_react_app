import React from 'react';
import { Link } from 'react-router-dom';

import '../../sass/sidemenu.scss';

function RankingMenu(props){
  const { type, smoothScroll, toggle } = props;
  return (
    <React.Fragment>
      <nav className="side_navbar">
        <ul className="side_navbar_list">
          <li className="list_item muted">{type === 'movie' ? 'Filmy' : (type === 'person' ? 'Ludzie' : 'Seriale' )}</li>
          <li className="list_item title">Ranking</li>
          <li className="list_item_link" onClick={() => smoothScroll('popular_section')}>{type !== 'person' ? 'Popularne' : 'Popularni' }</li>
          {type !== 'person' ? (<li className="list_item_link" onClick={() => smoothScroll('top_rated_section')}>Najlepiej oceniane</li>) : null }
          <span className="line"></span>
          <li className="list_item_link"><Link to={`/search/${type}`}>Wyszukiwarka</Link></li>
          <li className="list_item_link"><Link to="/extra/favourite">Ulubione</Link></li>
          <li className="list_item_link"><Link to="/extra/want_see">Chcę zobaczyć</Link></li>
        </ul>
      </nav>
      <i onClick={toggle} className="open_side_menu fas fa-angle-right"></i>
    </React.Fragment>
  )
}

export default RankingMenu;