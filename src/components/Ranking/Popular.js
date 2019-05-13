import React from 'react';
import PropTypes from 'prop-types';
import RankingItems from './RankingItems';

function Popular({ type, popular }){

  if(!popular || popular.length === 0) return null;

  return (
    <section className="popular_section">
      <header>
        <h2 className="ranking_title">{ type === 'movie' ? 'Popularne filmy' : (type === 'tv' ? 'Popularne seriale' : 'Popularni')}</h2>
      </header>
      <RankingItems type={type} value={popular} typeData={'popular'} />
    </section>
  )
}

Popular.propTypes = {
  type: PropTypes.string.isRequired,
  popular: PropTypes.array
};

export default Popular;