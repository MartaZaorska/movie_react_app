import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Credits({ crew, cast }){

  let [castVisible, setCastVisible] = React.useState(0);
  let [crewVisible, setCrewVisible] = React.useState(0);

  React.useEffect(() => {
    setCastVisible(Math.min((window.innerWidth > 576 ? 9 : 5), cast.length));
    setCrewVisible(Math.min((window.innerWidth > 576 ? 9 : 5), crew.length));
  }, []);

  const castTotal = cast.length;
  const crewTotal = crew.length;
  const count = window.innerWidth > 576 ? 9 : 5;

  const showMoreCast = () => {
    let visible = Math.min(castVisible + count, castTotal);
    if(visible === castTotal) document.querySelector(`.cast_button`).style.display = 'none';
    setCastVisible(visible);
  }

  const showMoreCrew = () => {
    let visible = Math.min(crewVisible + count, crewTotal);
    if(visible === crewTotal) document.querySelector(`.crew_button`).style.display = 'none';
    setCrewVisible(visible);
  }

  return (
    <section className="realization_credits">

      {castTotal === 0 ? null : (
        <React.Fragment>

          <header><h2 className="realization_title">Obsada</h2></header>

          <section className="realization_credits_cast">
            {cast.slice(0, castVisible).map(person => (
              <section key={`${person.id}-${person.credit_id}`} className="cast_item">
                <section className="cast_item_image">
                  {person.profile_path ? <img src={`https://image.tmdb.org/t/p/w45${person.profile_path}`} /> : <i className="far fa-user"></i> }
                </section>
                <p className="cast_item_name"><Link to={`/person/${person.id}`}>{person.name}</Link><br />jako {person.character.length <= 20 ? person.character : `${person.character.substring(0, 17)}...`}</p>
              </section>
            ))}
            <div style={{ clear: 'both' }}></div>
          </section>

          {castVisible === castTotal ? null : (<button className="realization_button cast_button" onClick={showMoreCast}>Pokaż więcej</button>)}

        </React.Fragment>
      )}

      {crewTotal === 0 ? null : (
        <React.Fragment>

          <header><h2 className="realization_title">Twórcy</h2></header>

          <section className="realization_credits_crew">
            {crew.slice(0, crewVisible).map(person => (
              <section key={`${person.id}-${person.credit_id}`} className="crew_item">
                <section className="crew_item_image">
                  {person.profile_path ? <img src={`https://image.tmdb.org/t/p/w45${person.profile_path}`} /> : <i className="far fa-user"></i>}
                </section>
                <p className="crew_item_name"><Link to={`/person/${person.id}`}>{person.name}</Link><br />{person.job ? (person.job.length <= 25 ? person.job : `${person.job.substring(0, 22)}...`) : null}</p>
              </section>
            ))}
            <div style={{ clear: 'both' }}></div>
          </section>

          {crewVisible === crewTotal ? null : (<button className="realization_button crew_button" onClick={showMoreCrew}>Pokaż więcej</button>)}

        </React.Fragment>
      )}  

    </section>
  )
}

Credits.propTypes = {
  cast: PropTypes.array,
  crew: PropTypes.array
};

export default Credits;