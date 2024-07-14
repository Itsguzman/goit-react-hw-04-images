import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './item.module.css';

export class ImageGalleryItem extends Component {
  static propTypes = {
    webURL: PropTypes.string.isRequired,
    largeURL: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
  };

  render() {
    const { webURL, largeURL, tags } = this.props;
    return (
      <div>
        <li className={css.ImageGalleryItem}>
          <a href={largeURL}>
            <img
              src={webURL}
              alt={tags}
              className={css.ImageGalleryItemImage}
            />
          </a>
        </li>
      </div>
    );
  }
}

export default ImageGalleryItem;
