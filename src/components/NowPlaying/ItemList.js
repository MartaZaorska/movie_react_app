import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

function ItemList({ items, itemIndex, changeIndex, type }){

  if(!items || items.length === 0) return null;

  return (
    <article className="now_playing_item_list">
      <section className="now_playing_item_list_content">
        {items.map((item, index) => (
          <section key={item.id} onClick={() => changeIndex(index)} className={classNames({
            'item_list': true,
            'item_list_active': index === itemIndex
          })}>
            <section className="item_list_image">
              { item.poster_path ? (<img src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`} alt="poster" />) : (<i className="fas fa-film"></i>) }
            </section>
            <p className="item_list_name">{type === 'movie' ? item.title : item.name }</p>
          </section>
        ))}
      </section>
    </article>
  )
}

ItemList.propTypes = {
  items: PropTypes.array,
  itemIndex: PropTypes.number.isRequired,
  changeIndex: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default ItemList;