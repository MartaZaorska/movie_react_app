import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { smoothScroll, toggleSideMenu } from '../../extra';

import '../../sass/sidemenu.scss';

function RealizationMenu({ element, type }){

  const { name = "", vote_average = 0, vote_count = 0, title = "" } = element.base;

  let videoURL = false;
  if(type === 'movie' && element.videos && element.videos.results){
    const video_element = element.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    videoURL = video_element ? `https://youtu.be/${video_element.key}` : '';
  }

  const { credits, images, recommendations } = element;

  const showCredits = (credits && credits.cast && credits.cast.length > 0) || (credits && credits.crew && credits.crew.length > 0);

  const showImages = (images && images.backdrops && images.backdrops.length > 0) || (images && images.posters && images.posters.length > 0);

  const showRecommendations = recommendations && recommendations.results && recommendations.results.length > 0;

  return (
    <React.Fragment>
      <nav className="side_navbar">
        <ul className="side_navbar_list">

          <li className="list_item_link title" onClick={() => smoothScroll('realization_main')}>{ type === 'movie' ? title : name }</li>

          <li className="list_item vote_average">Ocena: {vote_average === 0 ? (<span className="empty">brak oceny</span>) : (<span className="average">{vote_average}</span>)}</li>

          <li className="list_item vote_count">Ilość głosów: {vote_count === 0 ? (<span className="empty">brak głosów</span>) : (<span className="count">{vote_count}</span>)}</li>

          { showCredits ? <li className="list_item_link" onClick={() => smoothScroll('realization_credits')}>Obsada</li> : null }

          { showImages ? <li className="list_item_link" onClick={() => smoothScroll('realization_photos')}>Zdjęcia</li> : null }

          { showRecommendations ? <li className="list_item_link" onClick={() => smoothScroll('realization_recommendations')}>Polecane</li> : null }

          {videoURL ? (<li className="list_item_link movie_trailer"><a href={videoURL} target="_blank" rel="noopener noreferrer">Zwiastun</a></li>) : null }

          <span className="line"></span>

          <li className="list_item_link link_desktop"><Link to={`/search/${type}`}>Wyszukiwarka</Link></li>
          <li className="list_item_link link_desktop"><Link to={`/ranking/${type}`}>Popularne</Link></li>
          <li className="list_item_link link_desktop"><Link to={`/now_playing/${type}`}>{type === 'movie' ? `W kinach` : `Najbliższe premiery`}</Link></li>

          <span className="line"></span>

          <li className="list_item_link"><Link to="/extra">Ulubione</Link></li>
          <li className="list_item_link"><Link to="/extra">Chcę zobaczyć</Link></li>

        </ul>
      </nav>
      <i onClick={toggleSideMenu} className="open_side_menu fas fa-angle-right"></i>
    </React.Fragment>
  );
}

RealizationMenu.propTypes = {
  element: PropTypes.object,
  type: PropTypes.string.isRequired
};

export default RealizationMenu;