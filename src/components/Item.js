import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import '../sass/item.scss';

function Item({type, typeData, item, index}){

  if(!item) return null;

  const { poster_path = "", id = "", name = "", vote_average = 0, first_air_date = "", release_date = "", title = "", profile_path = "", known_for = [] } = item;

  return (
    <section className={classNames({'item': true, 'item_ranking': typeData === 'ranking', 'item_result': typeData === 'result', 'item_extra': typeData === 'extra' })}>

      {typeData === 'ranking' ? (
        <section className="item_number">{index + 1}</section>
      ) : null }

      {type !== 'person' ? (
        <section className="item_image">{poster_path ? (<img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="poster" />) : (<i className="fas fa-film"></i>) }</section>
      ) : (
        <section className="item_image">{profile_path ? (<img src={`https://image.tmdb.org/t/p/w300${profile_path}`} alt="person" />): (<i className="fas fa-user"></i>)}</section>
      )}

      <section className="item_content">

        {type !== 'person' ? (
          <p className="item_date">
            {type === 'movie' ? `${release_date.substring(0,4)}` : `${first_air_date.substring(0,4)}`}
          </p>
        ) : (
          <p className="people_empty"></p>
        )}

        <p className="item_title">
          {type === 'movie' ? (title.length <= 23 ? `${title}` : `${title.substring(0,20)}...`) : (name.length <= 23 ? `${name}` : `${name.substring(0,20)}...`) }
        </p>

        {type === 'person' ? (known_for && known_for.length > 0 ? (
          <p className="item_known">Znany/a z: {known_for[0].title ? (
            <Link to={`/realization/movie/${known_for[0].id}`}>{known_for[0].title.length > 18 ? `${known_for[0].title.substring(0,15)}...` : `${known_for[0].title}`}</Link>
          ) : (
            <Link to={`/realization/tv/${known_for[0].id}`}>{known_for[0].name.length > 18 ? `${known_for[0].name.substring(0,15)}...` : `${known_for[0].name}`}</Link>
          )}</p>
        ) : null) : (
          <p className="item_vote">Ocena: {vote_average === 0 ? (<span className="average_muted">brak oceny</span>) : (<span className="average">{vote_average}</span>)}</p>
        )}

        {type !== 'person' ? (
          <Link to={`/realization/${type}/${id}`} className="item_link">{type === 'movie' ? 'Przejdź do filmu' : 'Przejdź do serialu'}</Link>
        ) : (
          <Link to={`/person/${id}`} className="item_link">Dowiedz się więcej</Link>
        )}

      </section>

      <div style={{ clear: 'both' }}></div>

    </section>
  );
}

Item.propTypes = {
  type: PropTypes.string.isRequired,
  typeData: PropTypes.string,
  item: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default Item;