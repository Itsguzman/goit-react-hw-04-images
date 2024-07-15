import React from 'react';
import PropTypes from 'prop-types';
import css from './item.module.css';

const ImageGalleryItem = ({ webURL, largeURL, tag }) => {
  return (
    <div>
      <li className={css.ImageGalleryItem}>
        <a href={largeURL}>
          <img src={webURL} alt={tag} className={css.ImageGalleryItemImage} />
        </a>
      </li>
    </div>
  );
};

ImageGalleryItem.propTypes = {
  webURL: PropTypes.string.isRequired,
  largeURL: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
