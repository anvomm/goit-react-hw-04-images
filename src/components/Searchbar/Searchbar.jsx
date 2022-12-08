import { Component } from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = e => {
    this.setState({ query: e.target.value });
  };

  submitHandler = e => {
    const { query } = this.state;
    e.preventDefault();

    if (query.trim() === '') {
      return this.notifyAboutWhitespace();
    }

    this.props.showPictures(query);
    this.setState({ query: '' });
  };

  notifyAboutWhitespace = () => {
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

  render() {
    return (
      <header className={s.Searchbar}>
        <form className={s.SearchForm} onSubmit={this.submitHandler}>
          <button type="submit" className={s.SearchForm__button}>
            <span className={s.SearchForm__button_label}>Search</span>
          </button>

          <input
            onChange={this.handleInputChange}
            className={s.SearchForm__input}
            value={this.state.query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  showPictures: PropTypes.func.isRequired,
};
