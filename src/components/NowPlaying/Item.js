import React from 'react';
import { Link } from 'react-router-dom';

function Item(props){

  const { type, items, itemIndex } = props;

  if(!items) return <div>Loading...</div>

  const { title, name, vote_average, id, vote_count, backdrop_path, overview, release_date, first_air_date } = items[itemIndex];
  let info = window.innerWidth > 768 ? overview : (overview.length > 120 ? `${overview.substring(0, 117)}...` : overview);

  return (
    <article className="now_playing_item" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${backdrop_path})`}}>
      <section className="item_cover_gradient">
        <header>
          <h3 className="now_playing_title">{type === 'movie' ? 'W kinach' : 'Najbliższe premiery seriali'}</h3>
        </header>
        <section className="item_content">
          <p className="item_date">{ type === 'movie' ? release_date : first_air_date }</p>
          <header>
            <h1 className="item_title"><Link to={`/realization/${type}/${id}`}>{ type === 'movie' ? title : name }</Link></h1>
          </header>
          <p className="item_vote">Ocena: <span className="average">{ vote_average === 0 ? 'brak oceny' : vote_average}</span>, ilość głosów: <span className="count">{ vote_count === 0 ? 'brak głosów' : vote_count }</span></p>
          <p className="item_overview">{info.length >= 400 ? `${info.substring(0, 318)}...` : info }</p>
        </section>
      </section>
    </article>
  )
}

export default Item;