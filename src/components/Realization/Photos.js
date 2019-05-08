import React from 'react';

function Photos(props){

  let [visibleImages, setVisibleImages] = React.useState(0);
  let [openModal, setOpenModal] = React.useState(false);
  let [imageIndex, setImageIndex] = React.useState(0);

  const images = props.images.backdrops && props.images.posters ? [...props.images.backdrops, ...props.images.posters] : [];
  const count = window.innerWidth > 576 ? 15 : 6;
  const totalImages = images.length;

  const closeModal = () => {
    setOpenModal(false);
  }

  const prevImage = () => {
    let index = imageIndex - 1;
    if(index < 0) index = images.length - 1;
    setImageIndex(index);
  }

  const nextImage = () => {
    let index = imageIndex + 1;
    if(index > images.length - 1) index = 0;
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
  
  return (
    <React.Fragment>

      { openModal ? (
        <section className="modal_background">
          <section className="modal">
            <button className="modal_button modal_prev" onClick={prevImage}><i className="fas fa-angle-left"></i></button>
            <button className="modal_button modal_next" onClick={nextImage}><i className="fas fa-angle-right"></i></button>
            <button className="modal_button modal_close" onClick={closeModal}><i className="fas fa-times"></i></button>
            <section className="modal_image">
              <img src={`https://image.tmdb.org/t/p/w780${images[imageIndex].file_path}`} alt="photo" />
            </section>
          </section>
        </section>
      ) : null }

      <section className="realization_photos">
        <header><h2 className="realization_title">Zdjęcia</h2></header>
        {images.slice(0, visibleImages).map((image, index) => (
          <section className="realization_photos_item" onClick={e => handleClick(index)} key={index} style={{backgroundImage: `url(https://image.tmdb.org/t/p/w300${image.file_path})`}}></section>
        ))}
      </section>
      {visibleImages !== totalImages ? (
        <button onClick={showMore} className="realization_button showmore_photos_button">Pokaż więcej</button>
      ) : null }
    </React.Fragment>
  );
}

export default Photos;