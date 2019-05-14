import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ActiveItem({ items, type, itemIndex }){

  if(!items) return null;

  const { title = "", name = "", vote_average = 0, id = "", vote_count = 0, backdrop_path = "", overview = "", release_date = "", first_air_date = "" } = items[itemIndex];
  const backgroundURL = backdrop_path ? `url(https://image.tmdb.org/t/p/w1280/${backdrop_path})` : 'none';

  let info = window.innerWidth > 768 ? overview : (overview.length > 120 ? `${overview.substring(0, 117)}...` : overview);

  return (
    <article className="now_playing_item" style={{ backgroundImage: backgroundURL }}>
      <section className="now_playing_item_gradient">
        <header>
          <h3 className="now_playing_title">{type === 'movie' ? 'W kinach' : 'Najbliższe premiery seriali'}</h3>
        </header>
        <section className="now_playing_item_content">
          <p className="item_date">{ type === 'movie' ? release_date : first_air_date }</p>
          <header>
            <h1 className="item_title"><Link to={`/realization/${type}/${id}`}>{ type === 'movie' ? title : name }</Link></h1>
          </header>
          <p className="item_vote">
            Ocena: <span className="average">{ vote_average === 0 ? 'brak oceny' : vote_average}</span>, ilość głosów: <span className="count">{ vote_count === 0 ? 'brak głosów' : vote_count }</span>
          </p>
          <p className="item_overview">{info.length >= 400 ? `${info.substring(0, 318)}...` : info }</p>
        </section>
      </section>
    </article>
  )
}

ActiveItem.propTypes = {
  type: PropTypes.string.isRequired,
  items: PropTypes.array,
  itemIndex: PropTypes.number.isRequired
};

export default ActiveItem;