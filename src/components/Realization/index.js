import React from 'react';
import Context from '../../context';

import RealizationMenu from './RealizationMenu';
import Spinner from '../Spinner';
import Movie from './Movie';
import Tv from './Tv';
import NotFound from '../NotFound';

import '../../sass/realization.scss';

function Realization(props){
  
  const context = React.useContext(Context);

  React.useEffect(() => {
    if(context.clearSingleElement) context.clearSingleElement();
    if(context.getSingleElement) context.getSingleElement(props.match.params.type_media, props.match.params.id); 
  }, [props.match.params.type_media, props.match.params.id]);

  if(context.isLoading) return <Spinner />

  if(!context.isLoading && context.notFoundError) return <NotFound type={props.match.params.type_media} />

  if(!context.singleElement) return null;
 
  const type = props.match.params.type_media;

  return (
    <article className="realization_container">
      <RealizationMenu element={context.singleElement} type={type} />
      {type === 'movie' ? (
        <Movie element={context.singleElement}  />
      ) : (
        <Tv element={context.singleElement}  />
      )}
    </article>
  );
}

export default Realization;