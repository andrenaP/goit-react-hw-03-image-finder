import { Component } from 'react';
import PropTypes from 'prop-types';
import './ImageGalleryItem.css';

class ImageGalleryItem extends Component {
  render() {
    const { smallPicture, alt, onClick, largeImage } = this.props;
    return (
      <li className="galleryItem" onClick={() => onClick(largeImage)}>
        <img src={smallPicture} alt={alt} className="galleryImg" />
      </li>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  smallPicture: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImage: PropTypes.string.isRequired,
};
