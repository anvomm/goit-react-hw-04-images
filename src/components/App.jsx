import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchPictures, amountOfPages } from 'services/picturesAPI';
import { filterPicturesArray } from 'services/picturesArrayFilter';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import s from './App.module.css';
import { useState, useEffect, useLayoutEffect } from 'react';

export const App = () => {
  const [query, setQuery] = useState('');
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [totalNumberOfPages, setTotalNumberOfPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [idToScrollTo, setIdToScrollTo] = useState('');
  const [modalShown, setModalShown] = useState(false);

  useEffect(() => {
    const getPictures = async () => {
      setIsLoading(true);

      const arrayOfPictures = await fetchPictures(query, page);
      const filteredArray = filterPicturesArray(arrayOfPictures);
      if (filteredArray.length === 0) {
        setIsLoading(false);
        return notifyAboutWrongQuery();
      }

      setIdToScrollTo(filteredArray[0].id);
      setTotalNumberOfPages(amountOfPages);
      setModalShown(false);
      setPictures(prevPictures => [...prevPictures, ...filteredArray]);

      setIsLoading(false);
    };

    if (query) {
      getPictures();
    }
  }, [query, page]);

  useLayoutEffect(() => {
    if (page !== 1 && !modalShown) {
      console.log(modalShown);
      const { height: cardHeight } = document
        .getElementById(idToScrollTo)
        .getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 1.8,
        behavior: 'smooth',
      });
    }
    if (page === totalNumberOfPages) {
      notifyAboutTheEndOfCollection();
      setTotalNumberOfPages(0);
    }
  }, [page, modalShown, idToScrollTo, totalNumberOfPages]);

  const showPictures = query => {
    setPictures([]);
    setQuery(query);
    setPage(1);
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = imageURL => {
    setCurrentImage(imageURL);
    setModalShown(true);
  };

  const closeModal = () => {
    setCurrentImage(null);
  };

  const notifyAboutWrongQuery = () => {
    toast.error('☹️ No pictures found, please try another search query!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  const notifyAboutTheEndOfCollection = () => {
    toast.info('All the items suiting your inquiry are listed.', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
  };

  return (
    <div className={s.App}>
      <Searchbar showPictures={showPictures} />
      {pictures.length > 0 && (
        <ImageGallery pictures={pictures} openModal={openModal} query={query} />
      )}
      {isLoading && <Loader />}
      {pictures.length > 0 && !isLoading && page < totalNumberOfPages && (
        <Button loadMore={loadMore} />
      )}
      {currentImage && (
        <Modal
          query={query}
          largeImageURL={currentImage}
          closeModal={closeModal}
        />
      )}
      <ToastContainer />
    </div>
  );
};
