import React from 'react';

function MainTv(props){

  let [fullOverview, setFullOverview] = React.useState(false);

  const { base, external_ids, videoURL } = props;
  const { first_air_date, last_air_date, episode_run_time, in_production, genres, name, overview, homepage = "", imdb_id = "" } = base;
  const { facebook_id = "", twitter_id = "", instagram_id = "" } = external_ids;
  
  let time;
  time = first_air_date ? (in_production ? `(${first_air_date.substring(0,4)}- ) | ` : (last_air_date ? `(${first_air_date.substring(0,4)} - ${last_air_date.substring(0,4)}) | ` : `(${first_air_date.substring(0,4)}) | `)) : '';
  time += episode_run_time && episode_run_time.length !== 0 ? (episode_run_time.length === 1 ? `${episode_run_time[0]} min.` : `${Math.min(...episode_run_time)} - ${Math.max(...episode_run_time)} min.` ) : '';

  return (
    <section className="realization_main">

      <p className="main_time">{time}</p>
      <header>
        <h1 className="main_title">{name}</h1>
      </header>
      {genres.map(genre => (
        <span className="main_genre" key={genre.id}>{genre.name}</span>
      ))}

      <p className="main_overview">{window.innerWidth > 576 || fullOverview || overview.length <= 250 ? overview : `${overview.substring(0,250)}...`}</p>

      { window.innerWidth > 576  || overview.length <= 250 ? null : (fullOverview ? (<button className="main_overview_link" onClick={() => setFullOverview(!fullOverview)}>Ukryj opis</button>) : (<button className="main_overview_link" onClick={() => setFullOverview(!fullOverview)}>Pokaż opis</button>) )}<br />

      {homepage ? (<a className="main_link" href={homepage}><i className="fas fa-home"></i></a>) : null}
      {imdb_id ? (<a className="main_link" href={`https://www.imdb.com/title/${imdb_id}`}><i className="fab fa-imdb"></i></a>) : null}
      {facebook_id ? (<a className="main_link" href={`https://www.facebook.com/${facebook_id}`}><i className="fab fa-facebook-f"></i></a>) : null}
      {instagram_id ? (<a className="main_link" href={`https://www.instagram.com/${instagram_id}`}><i className="fab fa-instagram"></i></a>) : null}
      {twitter_id ? (<a className="main_link" href={`https://twitter.com/${twitter_id}`}><i className="fab fa-twitter"></i></a>) : null}

      { videoURL ? (<a href={videoURL} className="main_button"><i className="fas fa-play"></i> Zwiastun</a>) : null}

      <a href="#" className="main_button heart"><i className="far fa-heart"></i></a>
      <a href="#" className="main_button see">Chcę zobaczyć</a>

    </section>
  );
}

export default MainTv;