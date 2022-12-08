import { Component } from 'react';
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

export class App extends Component {
  state = {
    query: '',
    searchDone: false,
    pictures: [],
    page: 1,
    totalNumberOfPages: 0,
    isLoading: false,
    currentImage: null,
    idToScrollTo: '',
    modalShown: false,
  };

  componentDidUpdate(_, prevState) {
    const { searchDone, page, modalShown, totalNumberOfPages } = this.state;

    if (searchDone !== prevState.searchDone || page !== prevState.page) {
      this.getPictures();
    }

    if (page !== 1 && !modalShown) {
      this.scrollToFirstPicture();
    }
    if (page === totalNumberOfPages) {
      this.notifyAboutTheEndOfCollection();
      this.setState({ totalNumberOfPages: 0 });
    }
  }

  getPictures = async () => {
    const { query, page } = this.state;

    this.setState({ isLoading: true });

    const arrayOfPictures = await fetchPictures(query, page);
    const filteredArray = filterPicturesArray(arrayOfPictures);
    if (filteredArray.length === 0) {
      this.setState({ isLoading: false });
      return this.notifyAboutWrongQuery();
    }

    this.setState({
      idToScrollTo: filteredArray[0].id,
      modalShown: false,
      totalNumberOfPages: amountOfPages,
    });
    this.setState(prevState => ({
      pictures: [...prevState.pictures, ...filteredArray],
    }));
    this.setState({ isLoading: false });
  };

  showPictures = query => {
    this.setState(prevState => ({
      searchDone: !prevState.searchDone,
      pictures: [],
      query,
      page: 1,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = imageURL => {
    this.setState({
      currentImage: imageURL,
      modalShown: true,
    });
  };

  closeModal = () => {
    this.setState({ currentImage: null });
  };

  notifyAboutWrongQuery() {
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
  }

  notifyAboutTheEndOfCollection() {
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
  }

  scrollToFirstPicture() {
    const { height: cardHeight } = document
      .getElementById(this.state.idToScrollTo)
      .getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.8,
      behavior: 'smooth',
    });
  }

  render() {
    const {
      pictures,
      query,
      isLoading,
      currentImage,
      totalNumberOfPages,
      page,
    } = this.state;
    return (
      <div className={s.App}>
        <Searchbar showPictures={this.showPictures} />
        {pictures.length > 0 && (
          <ImageGallery
            pictures={pictures}
            openModal={this.openModal}
            query={query}
          />
        )}
        {isLoading && <Loader />}
        {pictures.length > 0 && !isLoading && page < totalNumberOfPages && (
          <Button loadMore={this.loadMore} />
        )}
        {currentImage && (
          <Modal
            query={query}
            largeImageURL={currentImage}
            closeModal={this.closeModal}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}
