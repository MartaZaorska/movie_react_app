import React from 'react';

import MainTv from './MainTv';
import Credits from './Credits';
import Photos from './Photos';
import Recommendations from './Recommendations';

function Tv(props){

  const { base, credits, external_ids, images, recommendations } = props.element;
  const { crew, cast } = credits;
  const { backdrop_path, created_by, poster_path } = base;

  const imageURL = window.innerWidth >= 576 ? backdrop_path : poster_path;

  const totalCrew = crew && created_by ? [...created_by, ...crew] : [];

  return (
    <section className="realization_wrapper" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${imageURL})`}}>
      <section className="realization_cover">
        <MainTv base={base} external_ids={external_ids} videoURL={false}/>
        <Credits crew={totalCrew} cast={cast} />
        <Photos images={images} />
        <Recommendations recommendations={recommendations} />
      </section>
    </section>
  );
}

export default Tv;