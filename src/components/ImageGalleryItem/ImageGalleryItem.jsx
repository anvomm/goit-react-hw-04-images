import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
  query,
  imageURL,
  largeImageURL,
  openModal,
}) => (
  <img
    className={s.ImageGalleryItem__image}
    src={imageURL}
    alt={query}
    onClick={() => {
      openModal(largeImageURL);
    }}
  />
);

ImageGalleryItem.propTypes = {
  query: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};
