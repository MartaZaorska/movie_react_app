import React from 'react';
import RankingItems from './RankingItems';

function Popular(props){
  
  const { type, popular } = props;

  if(!popular || popular.length === 0) return <div>Loading...</div>

  return (
    <section className="popular_section">
      <h2 className="ranking_title">{ type === 'movie' ? 'Popularne filmy' : (type === 'tv' ? 'Popularne seriale' : 'Popularni')}</h2>
      <RankingItems type={type} value={popular} typeData={'popular'} />
    </section>
  )
}

export default Popular;