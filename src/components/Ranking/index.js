import React from 'react';
import Context from '../../context';

import RankingMenu from './RankingMenu';
import Popular from './Popular';
import TopRated from './TopRated';

import '../../sass/ranking.scss';

function Ranking(props){

  const context = React.useContext(Context);

  const smoothScroll = nameClass => {
    const element = document.querySelector(`.${nameClass}`);
    if(window.innerWidth <= 768) toggleSideMenu();
    window.scroll({ left: 0, top: element.offsetTop, behavior: 'smooth' });
  }
  
  const toggleSideMenu = () => {
    const sideMenu = document.querySelector('.open_side_menu');
    sideMenu.classList.toggle('fa-angle-right');
    sideMenu.classList.toggle('fa-angle-left');
    sideMenu.classList.toggle('active');
    document.querySelector('.side_navbar').classList.toggle('open_menu');
  }

  React.useEffect(() => {
    if(props.match.params.type_media === 'movie' && context.getRankingMovie){
      context.getRankingMovie();
    }else if(props.match.params.type_media === 'tv' && context.getRankingTv){
      context.getRankingTv();
    }else if(props.match.params.type_media === 'person' && context.getRankingPerson){
      context.getRankingPerson();
    }
  }, [props.match.params.type_media]);

  if(context.isLoading) return <div>Loading...</div>

  const type = props.match.params.type_media;
  const popular = type === 'movie' ? context.popularMovie : (type === 'tv' ? context.popularTv : context.popularPerson);
  const topRated = type === 'movie' ? context.topRatedMovie : (type === 'tv' ? context.topRatedTv : []);

  return (
    <article className="ranking_container">
      <RankingMenu type={type} toggle={toggleSideMenu} smoothScroll={smoothScroll} />
      <article className="ranking_wrapper">
        <Popular type={type} popular={popular} />
        { type !== 'person' ? <TopRated type={type} topRated={topRated} /> : null }
      </article>
    </article>
  );
}

export default Ranking;