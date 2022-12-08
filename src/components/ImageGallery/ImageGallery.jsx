import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export const ImageGallery = ({ pictures, query, openModal }) => (
  <ul className={s.ImageGallery}>
    {pictures.map(({ id, webformatURL, largeImageURL }) => (
      <li key={id} id={id} className={s.ImageGalleryItem}>
        <ImageGalleryItem
          imageURL={webformatURL}
          openModal={openModal}
          largeImageURL={largeImageURL}
          query={query}
        />
      </li>
    ))}
  </ul>
);

ImageGallery.propTypes = {
  pictures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
};
