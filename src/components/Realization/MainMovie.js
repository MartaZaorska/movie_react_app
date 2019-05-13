import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Store from '../../store';

function MainMovie({ base, videoURL, external_ids }){

  let [fullOverview, setFullOverview] = React.useState(false);
  let [favourite, setFavourite] = React.useState(false);
  let [wantSee, setWantSee] = React.useState(false);

  const { id, title = "", genres = [], overview = "", release_date = "", runtime = 0, homepage = "", imdb_id = "" } = base;
  const { facebook_id = "", twitter_id = "", instagram_id = "" } = external_ids;

  let time = `${release_date}`;
  time += runtime !== 0 ? ` | ${parseInt(runtime / 60)} godz. ${runtime % 60} min.` : '';


  const handleClick = name => {
    if(name === 'wantsee'){
      wantSee ? Store.removeElementFromStore(name, id) : Store.addElementToStore(name, base);
      setWantSee(!wantSee);
    }else if(name === 'favourite'){
      favourite ? Store.removeElementFromStore(name, id) : Store.addElementToStore(name, base);
      setFavourite(!favourite);
    }
  } 

  React.useEffect(() => {
    setFavourite(Store.checkElement('favourite', id));
    setWantSee(Store.checkElement('wantsee', id));
  }, []);

  return (
    <section className="realization_main">

      <p className="main_time">{time}</p>

      <header>
        <h1 className="main_title">{title}</h1>
      </header>

      {genres.map(genre => (
        <span className="main_genre" key={genre.id}>{genre.name}</span>
      ))}

      <p className="main_overview">{window.innerWidth > 576 || fullOverview || overview.length <= 250 ? overview : `${overview.substring(0,250)}...`}</p>

      { window.innerWidth > 576  || overview.length <= 250 ? null : (fullOverview ? (<button className="main_overview_link" onClick={() => setFullOverview(!fullOverview)}>Ukryj opis</button>) : (<button className="main_overview_link" onClick={() => setFullOverview(!fullOverview)}>Pokaż opis</button>) )}<br />


      {homepage ? (<a className="main_link" href={homepage} target="_blank" rel="noopener noreferrer"><i className="fas fa-home"></i></a>) : null}
      {imdb_id ? (<a className="main_link" href={`https://www.imdb.com/title/${imdb_id}`} target="_blank" rel="noopener noreferrer"><i className="fab fa-imdb"></i></a>) : null}
      {facebook_id ? (<a className="main_link" href={`https://www.facebook.com/${facebook_id}`} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>) : null}
      {instagram_id ? (<a className="main_link" href={`https://www.instagram.com/${instagram_id}`} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>) : null}
      {twitter_id ? (<a className="main_link" href={`https://twitter.com/${twitter_id}`} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>) : null}
      
      { videoURL ? (<a href={videoURL} className="main_button" target="_blank" rel="noopener noreferrer"><i className="fas fa-play"></i> Zwiastun</a>) : null}

      <span className={classNames({
        'main_button': true,
        'heart': true,
        'active': favourite
      })} onClick={() => handleClick('favourite')}>
        <i className={classNames({ 'fa-heart': true, 'fas': favourite, 'far': !favourite })}></i>
      </span>

      <span className={classNames({
        'main_button': true,
        'see': true,
        'active': wantSee
      })} onClick={() => handleClick('wantsee')}>
        { wantSee ? 'Nie chcę zobaczyć' : 'Chcę zobaczyć' }
      </span>

    </section>
  );
}

MainMovie.propTypes = {
  base: PropTypes.object,
  external_ids: PropTypes.object
};

export default MainMovie;