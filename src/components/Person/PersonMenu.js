import React from 'react';
import PropTypes from 'prop-types';

import { smoothScroll, toggleSideMenu } from '../../extra';

import '../../sass/sidemenu.scss';

function PersonMenu({ element, external_ids }){

  const { base, tagged_images, images, movie_credits, tv_credits } = element;

  const { profile_path = "", name = "", known_for_department = "", birthday = "", place_of_birth = "", deathday = "", homepage = "", imdb_id = "" } = base;

  const { facebook_id = "", instagram_id = "", twitter_id = "" } = external_ids;

  const showImages = images && images.profiles && images.profiles.length > 0 &&  tagged_images && tagged_images.results && tagged_images.results.length > 0;

  const showMovie = (movie_credits && movie_credits.cast && movie_credits.cast.length > 0) || (movie_credits && movie_credits.crew && movie_credits.crew.length > 0);

  const showTv = (tv_credits && tv_credits.cast && tv_credits.cast.length > 0) || (tv_credits && tv_credits.crew && tv_credits.crew.length > 0);

  return (
    <React.Fragment>
      <nav className="side_navbar person_side_navbar">
        <ul className="side_navbar_list">

          { profile_path ? <li className="picture" style={{backgroundImage: `url(https://image.tmdb.org/t/p/w300${profile_path})`}}></li> : <li className="picture_icon"><i className="fas fa-user"></i></li>}

          <li className="title">{name}</li>
          <li className="muted">{known_for_department}</li>
          { birthday ? <li className="list_item">Data urodzenia: <br /><span>{birthday}</span></li> : null }
          { place_of_birth ? <li className="list_item">Miejsce urodzenia: <br /><span>{place_of_birth}</span></li> : null }
          { deathday ? (<li className="list_item">Data śmierci: <br /><span>{deathday}</span></li>): null }

          { showMovie ? <li className="list_item_link" onClick={() => smoothScroll('person_movie')}>Filmy</li> : null }

          { showTv ? <li className="list_item_link" onClick={() => smoothScroll('person_tv')}>Seriale</li> : null }
          
          { showImages ? <li className="list_item_link" onClick={() => smoothScroll('person_images')}>Zdjęcia</li> : null }

          <span className="line"></span>

          <li className="person_socials">
            { homepage ? <a href={homepage} target="_blank" rel="noopener noreferrer"><i className="fas fa-home"></i></a> : null }
            { imdb_id ? <a href={`https://www.imdb.com/name/${imdb_id}`} target="_blank" rel="noopener noreferrer"><i className="fab fa-imdb"></i></a> : null }
            { facebook_id ? <a href={`https://www.facebook.com/${facebook_id}`} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a> : null }
            { instagram_id ? <a href={`https://www.instagram.com/${instagram_id}`} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a> : null }
            { twitter_id ? <a href={`https://twitter.com/${twitter_id}`} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a> : null }
          </li>

        </ul>
      </nav>
      <i onClick={toggleSideMenu} className="open_side_menu fas fa-angle-right"></i>
    </React.Fragment>
  );
}

PersonMenu.propTypes = {
  element: PropTypes.object,
  external_ids: PropTypes.object
};

export default PersonMenu;