import React from 'react';

import MainMovie from './MainMovie';
import Credits from './Credits';
import Photos from './Photos';
import Recommendations from './Recommendations';

function Movie(props){

  const { base, videos, credits, external_ids, images, recommendations } = props.element;
  const { crew, cast } = credits;

  let videoURL = false;
  if(videos && videos.results){
    const video_element = videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
    videoURL = video_element ? `https://youtu.be/${video_element.key}` : false;
  }

  const imageURL = window.innerWidth >= 576 ? base.backdrop_path : base.poster_path;

  return (
    <section className="realization_wrapper" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w1280${imageURL})`}}>
      <section className="realization_cover">
        <MainMovie base={base} videoURL={videoURL} external_ids={external_ids} />
        <Credits crew={crew} cast={cast} />
        <Photos images={images} />
        <Recommendations recommendations={recommendations} />
      </section>
    </section>
  );
}

export default Movie;