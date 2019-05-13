import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../sass/modal.scss';

function Modal({ closeModal, prevImage, nextImage, images, imageIndex }){

  return (
    <section className="modal_background">
      <section className="modal">

        <button className="modal_button modal_prev" onClick={prevImage}><i className="fas fa-angle-left"></i></button>
        <button className="modal_button modal_next" onClick={nextImage}><i className="fas fa-angle-right"></i></button>
        <button className="modal_button modal_close" onClick={closeModal}><i className="fas fa-times"></i></button>

        <section className="modal_image">
          <img src={`https://image.tmdb.org/t/p/w780${images[imageIndex].file_path}`} alt="poster" />
          { images[imageIndex].media && images[imageIndex].media.title ? (
            <Link to={`/realization/movie/${images[imageIndex].media.id}`} className="modal_caption">
              {images[imageIndex].media.title}
            </Link>
          ) : ( images[imageIndex].media && images[imageIndex].media.name ? (
            <Link to={`/realization/tv/${images[imageIndex].media.id}`} className="modal_caption">
              {images[imageIndex].media.name}
            </Link>
          ) : null) }
        </section>

      </section>
    </section>
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  prevImage: PropTypes.func.isRequired,
  nextImage: PropTypes.func.isRequired,
  images: PropTypes.array,
  imageIndex: PropTypes.number.isRequired
};

export default Modal;