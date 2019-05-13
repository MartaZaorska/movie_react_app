import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';

function Photos({ images }){

  let [visibleImages, setVisibleImages] = React.useState(0);
  let [openModal, setOpenModal] = React.useState(false);
  let [imageIndex, setImageIndex] = React.useState(0);

  const allImages = images.backdrops && images.posters ? [...images.backdrops, ...images.posters] : [];
  const count = window.innerWidth > 576 ? 15 : 6;
  const totalImages = allImages.length;

  const closeModal = () => {
    setOpenModal(false);
  }

  const prevImage = () => {
    let index = imageIndex - 1;
    if(index < 0) index = allImages.length - 1;
    setImageIndex(index);
  }

  const nextImage = () => {
    let index = imageIndex + 1;
    if(index > allImages.length - 1) index = 0;
    setImageIndex(index);
  }

  const handleClick  = index => {
    setImageIndex(index);
    setOpenModal(true);
  }

  const showMore = () => {
    let visible = Math.min(visibleImages + count, totalImages);
    if(visible >= totalImages) document.querySelector(`.showmore_photos_button`).style.display = 'none';
    setVisibleImages(visible);
  }

  React.useEffect(() => {
    setVisibleImages(Math.min((window.innerWidth > 576 ? 10 : 6), totalImages));
  }, []);
  
  if(allImages.length === 0) return null;

  return (
    <React.Fragment>

      { openModal ? (
        <Modal images={allImages} prevImage={prevImage} nextImage={nextImage} closeModal={closeModal} imageIndex={imageIndex} />
      ) : null }

      <section className="realization_photos">

        <header><h2 className="realization_title">Zdjęcia</h2></header>

        {allImages.slice(0, visibleImages).map((image, index) => (
          <section className="realization_photos_item" onClick={e => handleClick(index)} key={index} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w300${image.file_path})`}}></section>
        ))}

      </section>

      {visibleImages !== totalImages ? (
        <button onClick={showMore} className="realization_button showmore_photos_button">Pokaż więcej</button>
      ) : null }

    </React.Fragment>
  );
}

Photos.propTypes = {
  images: PropTypes.object
};

export default Photos;