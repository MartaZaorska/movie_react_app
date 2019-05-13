import React from 'react';
import PropTypes from 'prop-types';
import Item from '../Item';

function RankingItems({ type, typeData, value }){
  
  let [visibleItems, setVisibleItems] = React.useState(8);

  const count = 8;
  const totalItems = value.length;
 
  const showMore = nameClass => {
    let visible = Math.min(visibleItems + count, totalItems);
    if(visible >= totalItems) document.querySelector(`.${nameClass}`).style.display = 'none';
    setVisibleItems(visible);
  }

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

RankingItems.propTypes = {
  type: PropTypes.string.isRequired,
  typeData: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired
};

export default RankingItems;