import React from 'react';
import RankingItems from './RankingItems';

function TopRated(props){
  const { type, topRated } = props;

  if(!topRated || topRated.length === 0) return <div>Loading...</div>

  return (
    <section className="top_rated_section">
      <h2 className="ranking_title">{ type === 'movie' ? 'Najlepiej oceniane filmy' : 'Najlepiej oceniane seriale' }</h2>
      <RankingItems type={type} value={topRated} typeData={'topRated'} />
    </section>
  )
}

export default TopRated;