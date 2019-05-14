import React from 'react';
import Context from '../../context';

import RankingMenu from './RankingMenu';
import Popular from './Popular';
import TopRated from './TopRated';
import Spinner from '../Spinner';

import '../../sass/ranking.scss';

function Ranking(props){

  const context = React.useContext(Context);
  
  React.useEffect(() => {
    if(props.match.params.type_media === 'movie' && context.getRankingMovie){
      context.getRankingMovie();
    }else if(props.match.params.type_media === 'tv' && context.getRankingTv){
      context.getRankingTv();
    }else if(props.match.params.type_media === 'person' && context.getRankingPerson){
      context.getRankingPerson();
    }
    window.scroll({ left: 0, top: 0, behavior: 'smooth' });
  }, [props.match.params.type_media]);

  if(context.isLoading) return <Spinner />

  const type = props.match.params.type_media;
  const popular = type === 'movie' ? context.popularMovie : (type === 'tv' ? context.popularTv : context.popularPerson);
  const topRated = type === 'movie' ? context.topRatedMovie : (type === 'tv' ? context.topRatedTv : []);

  return (
    <article className="ranking_container">
      <RankingMenu type={type} />
      <article className="ranking_wrapper">
        <Popular type={type} popular={popular} />
        { type !== 'person' ? <TopRated type={type} topRated={topRated} /> : null }
      </article>
    </article>
  );
}

export default Ranking;