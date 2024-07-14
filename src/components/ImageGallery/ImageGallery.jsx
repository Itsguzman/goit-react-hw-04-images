import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import css from './imageGallery.module.css';
import PropTypes from 'prop-types';
import { Component } from 'react';

class ImageGallery extends Component {
  static propTypes = {
    photos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ).isRequired,
  };

  render() {
    const { photos } = this.props;
    return (
      <ul className={`gallery ${css.imageGallery}`}>
        {photos.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webURL={webformatURL}
            largeURL={largeImageURL}
            tag={tags}
          />
        ))}
      </ul>
    );
  }
}

export default ImageGallery;
