import React from 'react';
import Context from '../../context';

import PersonMenu from './PersonMenu';
import PersonImages from './PersonImages';
import PersonCredits from './PersonCredits';
import Spinner from '../Spinner';
import NotFound from '../NotFound';

import '../../sass/person.scss';

function Person(props){

  const context = React.useContext(Context);

  React.useEffect(() => {
    if(context.clearSingleElement) context.clearSingleElement();
    if(context.getSingleElement) context.getSingleElement('person', props.match.params.id); 
    window.scroll({ left: 0, top: 0, behavior: 'smooth' });
  }, [props.match.params.id]);

  if(context.isLoading) return <Spinner />

  if(!context.isLoading && context.notFoundError) return <NotFound />
  
  if(!context.singleElement) return null;
  
  const { base = {}, external_ids = {}, images = {}, tagged_images = {}, movie_credits = {}, tv_credits = {} } = context.singleElement;

  return (
    <article className="person_container">

      <PersonMenu element={context.singleElement} external_ids={external_ids} />
      
      <article className="person_wrapper">

        <PersonImages images={images} tagged_images={tagged_images} />

        <section className="person_movie">
          <PersonCredits data={movie_credits} gender={base.gender} creditsTitle="Filmy" />
        </section>

        <section className="person_tv">
          <PersonCredits data={tv_credits} gender={base.gender} creditsTitle="Seriale" />
        </section>

      </article>
    </article>
  );
}

export default Person;