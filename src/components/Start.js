import React from 'react';
import Context from '../context';
import { Link } from 'react-router-dom';

import '../sass/start.scss';

function Start(props){

  const context = React.useContext(Context);
  
  const handleClick = () => {
    document.querySelector('.start_container').style.transform = 'translateY(-100%)';
    setTimeout(() => props.history.push('/search/multi'), 450);
  }

  if(!context.startMovie){
    return <div>Loading...</div>
  }

  const { startMovie, genresMovie } = context;
  const { backdrop_path, title, genre_ids, release_date, id } = startMovie;

  return (
    <article className="start_container" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280/${backdrop_path})`}}>
      <div className="start_cover">
        <header>
          <h3 className="start_container_title">Najmocniej oczekiwana premiera</h3>
        </header>
        <section className="start_content">
          <p className="start_date">{release_date}</p>
          <header>
            <h1 className="start_title"><Link to={`/realization/movie/${id}`}>{title}</Link></h1>
          </header>
          <section className="start_genres">
            {genre_ids.map(genre_id => {
              const genre = genresMovie.find(genre_item => genre_item.id === genre_id);
              return <span key={`${genre_id}${genre.name}`} className="genre_item">{genre.name}</span>
            })}
          </section>
        </section>
        <button className="start_button" onClick={() => handleClick()}><i className="fas fa-angle-down"></i></button>
      </div>
    </article>
  )
}

export default Start;