import React from 'react';
import PropTypes from 'prop-types';

import MainTv from './MainTv';
import Credits from './Credits';
import Photos from './Photos';
import Recommendations from './Recommendations';

function Tv({ element }){

  const { base = {}, credits = {}, external_ids = {}, images = {}, recommendations = {} } = element;
  const { crew = [], cast = [] } = credits;
  const { backdrop_path = "", created_by = [] } = base;

  const totalCrew = crew && created_by ? [...created_by, ...crew] : [];
  const backgroundURL = backdrop_path ? `url(https://image.tmdb.org/t/p/w1280${backdrop_path})` : 'none'; 

  return (
    <section className="realization_wrapper" style={{ backgroundImage: backgroundURL }}>
      <section className="realization_cover">
        <MainTv base={base} external_ids={external_ids} />
        <Credits crew={totalCrew} cast={cast} />
        <Photos images={images} />
        <Recommendations recommendations={recommendations} />
      </section>
    </section>
  );
}

Tv.propTypes = {
  element: PropTypes.object
};

export default Tv;