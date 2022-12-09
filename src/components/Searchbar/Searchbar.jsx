import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

export const Searchbar = ({ showPictures }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = ({ target: { value } }) => {
    setQuery(value);
  };

  const submitHandler = e => {
    e.preventDefault();

    if (query.trim() === '') {
      return notifyAboutWhitespace();
    }

    showPictures(query);
    setQuery('');
  };

  const notifyAboutWhitespace = () => {
    toast.warn('Your search query should contain at least one letter!', {
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
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={submitHandler}>
        <button type="submit" className={s.SearchForm__button}>
          <span className={s.SearchForm__button_label}>Search</span>
        </button>

        <input
          onChange={handleInputChange}
          className={s.SearchForm__input}
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  showPictures: PropTypes.func.isRequired,
};
