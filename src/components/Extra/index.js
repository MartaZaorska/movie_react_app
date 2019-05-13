import React from 'react';
import Context from '../../context';

import ExtraMenu from './ExtraMenu';
import Spinner from '../Spinner';
import Item from '../Item';

import '../../sass/extra.scss';

function Extra(props){

  const context = React.useContext(Context);

  const { favourite, wantSee } = context;

  React.useEffect(() => {
    if(context.getElementsFromStore) context.getElementsFromStore();
  }, []);

  if(!favourite || !wantSee) return <Spinner />

  return (
    <article className="extra_container">
      <ExtraMenu />
      <article className="extra_wrapper">

        <section className="extra_favourite">
          <header><h2 className="extra_title">ULUBIONE</h2></header>
          {favourite.map((item, index) => {
            const type = item.title ? 'movie' : 'tv';
            return <Item index={index} key={item.id} item={item} type={type} typeData="extra" />
          })}
          {favourite.length === 0 ? <p className="not_results_text">Brak elementów</p> : null}
        </section>

        <section className="extra_wantsee">
          <header><h2 className="extra_title">CHCĘ ZOBACZYĆ</h2></header>
          {wantSee.map((item, index) => {
            const type = item.title ? 'movie' : 'tv';
            return <Item index={index} key={item.id} item={item} type={type} typeData="extra" />
          })}
          {wantSee.length === 0 ? <p className="not_results_text">Brak elementów</p> : null}
        </section>

      </article>
    </article>
  );
}

export default Extra;