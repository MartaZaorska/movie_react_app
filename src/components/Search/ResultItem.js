import React from 'react';
import { Link } from 'react-router-dom';

function ResultItem(props){

  const { poster_path, name, vote_average, first_air_date, release_date, title, profile_path, known_for, id } = props.item;

  const type = title ? 'movie' : (first_air_date? 'tv' : 'person');

  return (
    <article className="result_item">

      {type !== 'person' ? (
        <section className="result_item_image">{poster_path ? (<img src={`https://image.tmdb.org/t/p/w300${poster_path}`} alt="poster" />) : (<i className="fas fa-film"></i>) }</section>
      ) : (
        <section className="result_item_image">{profile_path ? (<img src={`https://image.tmdb.org/t/p/w300${profile_path}`} alt="person" />): (<i className="fas fa-user"></i>)}</section>
      )}

      <section className="result_item_content">

        {type !== 'person' ? (<p className="result_item_date">{type === 'movie' ? `${release_date.substring(0,4)}` : `${first_air_date.substring(0,4)}`}</p>) : (<p className="people_empty"></p>)}

        <p className="result_item_title">{type === 'movie' ? (title.length <= 23 ? `${title}` : `${title.substring(0,20)}...`) : (name.length <= 23 ? `${name}` : `${name.substring(0,20)}...`) }</p>

        { type!== 'person' ? (<p className="result_item_vote">Ocena: <span className="average">{vote_average === 0 ? '-.-' : vote_average}</span></p>) : (known_for ? (
          <p className="result_item_known">Znany/a z: <Link to={`/realization/${type}/${known_for[0].id}`}>{known_for[0] ? (known_for[0].title ? ( 
            known_for[0].title.length > 18 ? `${known_for[0].title.substring(0,15)}...` : `${known_for[0].title}`
          ) : (
            known_for[0].name.length > 18 ? `${known_for[0].name.substring(0,15)}...` : `${known_for[0].name}`
          )) : null }</Link></p>
        ) : null)}

        {type !== 'person' ? (
          <Link to={`/realization/${type}/${id}`} className="result_item_link">{type === 'movie' ? 'Przejdź do filmu' : 'Przejdź do serialu'}</Link>
        ) : (
          <Link to={`/person/${id}`} className="result_item_link">Dowiedz się więcej</Link>
        )}

      </section>
      <div style={{clear: 'both'}}></div>
    </article>
  );
}

export default ResultItem;