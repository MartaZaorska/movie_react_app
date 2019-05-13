import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CreditsItem({ item, type }){

  const { id, title = "", name = "", character = "", backdrop_path = "", department = "", first_air_date = "", release_date = "" } = item;
  
  let mainName = title ? title : name;
  mainName = mainName.length > 25 ? `${mainName.substring(0,22)}...` : mainName;

  let mainDate = type === 'movie' && release_date ? `${release_date.substring(0,4)}` : (type === 'tv' && first_air_date ? `${first_air_date.substring(0,4)}` : '');

  return (
    <section className="credits_item">

      <section className="credits_item_image">
        {backdrop_path ? <img src={`https://image.tmdb.org/t/p/w300${backdrop_path}`} alt="poster" /> : <i className="fas fa-film"></i>}
      </section>

      <section className="credits_item_content">
        <p className="credits_item_info">
          <span className="credits_item_title"><Link to={`/realization/${type}/${id}`}>{mainName} {mainDate ? `(${mainDate})` : null}</Link></span>
          <span className="credits_item_job">
            {character ? 'jako: ' : null } {character ? (<span className="character">{character.length > 20 ? `${character.substring(0, 18)}...` : character }</span>) : (<span className="job">{department}</span>)}
          </span>
        </p>
        <Link to={`/realization/${type}/${id}`} className="credits_item_link">Przejdź do {type==="movie" ? 'filmu' : 'serialu'}</Link>
      </section>
      <div style={{ clear: 'both' }}></div>

    </section>
  );
}

CreditsItem.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string.isRequired
};

export default CreditsItem;