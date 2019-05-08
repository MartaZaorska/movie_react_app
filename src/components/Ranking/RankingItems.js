import React from 'react';

import Item from '../Item';

function RankingItems(props){
  
  let [visibleItems, setVisibleItems] = React.useState(8);

  const count = 8;
  const totalItems = props.value.length;
 
  const showMore = nameClass => {
    let visible = Math.min(visibleItems + count, totalItems);
    if(visible >= totalItems) document.querySelector(`.${nameClass}`).style.display = 'none';
    setVisibleItems(visible);
  }

  const { type, typeData, value } = props;

  return (
    <React.Fragment>
      {value.slice(0, visibleItems).map((item, index) => (
        <Item index={index} key={item.id} item={item} type={type} typeData="ranking" />
      ))}
        
      { visibleItems !== totalItems ? (typeData === 'popular' ? (
        <button onClick={() => showMore('showmore_popular_button')} className="showmore_popular_button">Pokaż więcej</button>
      ) : (
        <button onClick={() => showMore('showmore_toprated_button')} className="showmore_toprated_button">Pokaż więcej</button>
      )) : null }

    </React.Fragment>
  )
}

export default RankingItems;