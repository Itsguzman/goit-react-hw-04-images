import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';
import React from 'react';

const ImageGallery = ({ photos }) => {
  return (
    <ul className={`gallery ${css.imageGallery}`}>
      {photos.map(({ id, webformatURL, largeImageURL, tags }, index) => (
        <ImageGalleryItem
          key={`${id}-${index}`}
          webURL={webformatURL}
          largeURL={largeImageURL}
          tag={tags}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ImageGallery;
