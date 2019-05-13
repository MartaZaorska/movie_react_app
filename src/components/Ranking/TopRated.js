import React from 'react';
import PropTypes from 'prop-types';
import RankingItems from './RankingItems';

function TopRated({ type, topRated }){

  if(!topRated || topRated.length === 0) return null;

  return (
    <section className="top_rated_section">
      <header>
        <h2 className="ranking_title">{ type === 'movie' ? 'Najlepiej oceniane filmy' : 'Najlepiej oceniane seriale' }</h2>
      </header>
      <RankingItems type={type} value={topRated} typeData={'topRated'} />
    </section>
  )
}

TopRated.propTypes = {
  type: PropTypes.string.isRequired,
  topRated: PropTypes.array
};

export default TopRated;