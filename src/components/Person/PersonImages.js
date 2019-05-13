import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Modal from '../Modal';

function PersonImages({ images, tagged_images }){

  let [visibleImages, setVisibleImages] = React.useState(0);
  let [openModal, setOpenModal] = React.useState(false);
  let [imageIndex, setImageIndex] = React.useState(0);

  const allImages = images.profiles && tagged_images.results ? [...tagged_images.results, ...images.profiles] : [];
  const count = window.innerWidth > 576 ? 10 : 6;
  const totalImages = allImages.length;

  const closeModal = () => {
    setOpenModal(false);
  }

  const prevImage = () => {
    let index = imageIndex - 1;
    if(index < 0) index = totalImages - 1;
    setImageIndex(index);
  }

  const nextImage = () => {
    let index = imageIndex + 1;
    if(index > totalImages - 1) index = 0;
    setImageIndex(index);
  }

  const handleClick  = index => {
    setImageIndex(index);
    setOpenModal(true);
  }

  const showMore = () => {
    let visible = Math.min(visibleImages + count, totalImages);
    if(visible >= totalImages) document.querySelector(`.showmore_person_images_button`).style.display = 'none';
    setVisibleImages(visible);
  }

  React.useEffect(() => {
    setVisibleImages(Math.min((window.innerWidth > 576 ? 10 : 6), totalImages));
  }, []);

  if(allImages.length === 0) return null;

  return (
    <React.Fragment>

      { openModal ? (
        <Modal closeModal={closeModal} prevImage={prevImage} nextImage={nextImage} images={allImages} imageIndex={imageIndex} />
      ) : null }

      <section className="person_images">
        <header><h2 className="person_title">Zdjęcia</h2></header>
        {allImages.slice(0, visibleImages).map((image, index) => (
          <section className="person_images_item" onClick={e => handleClick(index)} key={index} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w300${image.file_path})`}}></section>
        ))}
      </section>
      {visibleImages !== totalImages ? (
        <button onClick={showMore} className="person_button showmore_person_images_button">Pokaż więcej</button>
      ) : null }
    </React.Fragment>
  );
}

PersonImages.propTypes = {
  tagged_images: PropTypes.object,
  images: PropTypes.object
};

export default PersonImages;