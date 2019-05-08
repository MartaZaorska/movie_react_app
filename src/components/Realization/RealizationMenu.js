import React from 'react';
import { Link } from 'react-router-dom';

import '../../sass/sidemenu.scss';

function RealizationMenu(props){

  const { base, videos, toggle, smoothScroll, type } = props;
  const { name, vote_average, vote_count, title } = base;

  let videoURL = false;
  if(type === 'movie' && videos && videos.results){
    const video_element = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    videoURL = video_element ? `https://youtu.be/${video_element.key}` : false;
  }

  return (
    <React.Fragment>
      <nav className="side_navbar">
        <ul className="side_navbar_list">
          <li className="list_item_link title" onClick={() => smoothScroll('realization_main')}>{ type === 'movie' ? title : name }</li>
          <li className="list_item vote_average">Ocena: {vote_average === 0 ? (<span className="empty">brak oceny</span>) : (<span className="average">{vote_average}</span>)}</li>
          <li className="list_item vote_count">Ilość głosów: {vote_count === 0 ? (<span className="empty">brak głosów</span>) : (<span className="count">{vote_count}</span>)}</li>
          <li className="list_item_link" onClick={() => smoothScroll('realization_credits')}>Obsada</li>
          <li className="list_item_link" onClick={() => smoothScroll('realization_photos')}>Zdjęcia</li>
          <li className="list_item_link" onClick={() => smoothScroll('realization_recommendations')}>Polecane</li>
          {videoURL ? (<li className="list_item_link movie_trailer"><a href={videoURL}>Zwiastun</a></li>) : null }
          <span className="line"></span>
          <li className="list_item_link link_desktop"><Link to={`/search/${type}`}>Wyszukiwarka</Link></li>
          <li className="list_item_link link_desktop"><Link to={`/ranking/${type}`}>Popularne</Link></li>
          <li className="list_item_link link_desktop"><Link to={`/now_playing/${type}`}>{type === 'movie' ? `W kinach` : `Najbliższe premiery`}</Link></li>
          <span className="line"></span>
          <li className="list_item_link"><Link to="/extra/favourite">Ulubione</Link></li>
          <li className="list_item_link"><Link to="/extra/want_see">Chcę zobaczyć</Link></li>
        </ul>
      </nav>
      <i onClick={toggle} className="open_side_menu fas fa-angle-right"></i>
    </React.Fragment>
  );
}

export default RealizationMenu;