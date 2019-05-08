import React from 'react';
import Context from '../../context';

import Item from './Item';
import ItemList from './ItemList';

import '../../sass/nowplaying.scss';

function NowPlaying(props){
  
  const context = React.useContext(Context);

  let [ itemIndex, setItemIndex ] = React.useState(0);

  const toggleMenu = () => {
    document.querySelector('.now_playing_button').classList.toggle('fa-angle-left');
    document.querySelector('.now_playing_button').classList.toggle('fa-angle-right');
    document.querySelector('.now_playing_item_list').classList.toggle('open');
  }
  
  const changeIndex = index => {
    if(window.innerWidth <= 768) toggleMenu();
    if(itemIndex !== index){
      setItemIndex(index);
    }
  }

  React.useEffect(() => {
    setItemIndex(0);
    if(props.match.params.type_media === 'movie' && context.getNowPlayingMovie){
      context.getNowPlayingMovie();
    }else if(props.match.params.type_media === 'tv' && context.getOnAirTv){
      context.getOnAirTv();
    }
  }, [props.match.params.type_media]);


  if(context.isLoading) return <div>Loading...</div>
  
  const type = props.match.params.type_media;
  const items = type === 'movie' ? context.nowPlayingMovie : context.onAirTv;

  return (
    <article className="now_playing_container">
      <i onClick={toggleMenu} className="now_playing_button fas fa-angle-left"></i>
      <Item type={type} items={items} itemIndex={itemIndex} />
      <ItemList type={type} items={items} changeIndex={changeIndex} itemIndex={itemIndex} />
    </article>
  );
}

export default NowPlaying;