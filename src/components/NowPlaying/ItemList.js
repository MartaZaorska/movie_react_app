import React from 'react';

import classNames from 'classnames';

function ItemList(props){

  if(!props.items || props.items.length === 0) return <div>Loading...</div>

  const { items, itemIndex, changeIndex, type } = props;

  return (
    <article className="now_playing_item_list">
      <section className="item_list_content">
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

export default ItemList;