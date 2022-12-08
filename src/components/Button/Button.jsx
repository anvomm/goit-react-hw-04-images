import s from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ loadMore }) => (
  <button className={s.Button} type="button" onClick={loadMore}>
    Load more
  </button>
);

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
};
