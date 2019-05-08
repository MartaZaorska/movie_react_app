import React from 'react';
import Context from '../../context';

import RealizationMenu from './RealizationMenu';
import Movie from './Movie';
import Tv from './Tv';

import '../../sass/realization.scss';

function Realization(props){
  
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
    if(context.clearSingleElement) context.clearSingleElement();
    if(context.getSingleElement) context.getSingleElement(props.match.params.type_media, props.match.params.id); 
  }, [props.match.params.type_media, props.match.params.id]);

  if(context.isLoading || !context.singleElement) return <div>Loading...</div>

  const type = props.match.params.type_media;
  const { singleElement } = context;
  let videos = type === 'movie' ? singleElement.videos : false;

  return (
    <article className="realization_container">
      <RealizationMenu videos={videos} base={singleElement.base} smoothScroll={smoothScroll} toggle={toggleSideMenu} type={type} />
      {type === 'movie' ? (
        <Movie element={singleElement} />
      ) : (
        <Tv element={singleElement} />
      )}
    </article>
  );
}

export default Realization;