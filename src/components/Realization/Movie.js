import React from 'react';
import PropTypes from 'prop-types';

import MainMovie from './MainMovie';
import Credits from './Credits';
import Photos from './Photos';
import Recommendations from './Recommendations';

function Movie({ element }){

  const { base = {}, videos = {}, credits = {}, external_ids = {}, images = {}, recommendations = {} } = element;
  const { crew = [], cast = [] } = credits;
  const { backdrop_path = "" } = base;
  const backgroundURL = backdrop_path ? `url(https://image.tmdb.org/t/p/w1280${backdrop_path})` : 'none'; 

  let videoURL = false;
  if(videos && videos.results){
    const video_element = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    videoURL = video_element ? `https://youtu.be/${video_element.key}` : false;
  }


  return (
    <section className="realization_wrapper" style={{ backgroundImage: backgroundURL }}>
      <section className="realization_cover">
        <MainMovie base={base} videoURL={videoURL} external_ids={external_ids} />
        <Credits crew={crew} cast={cast} />
        <Photos images={images} />
        <Recommendations recommendations={recommendations} />
      </section>
    </section>
  );
}

Movie.propTypes = {
  element: PropTypes.object
};

export default Movie;