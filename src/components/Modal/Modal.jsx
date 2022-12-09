import { createPortal } from 'react-dom';
import s from './Modal.module.css';
import { IconContext } from 'react-icons';
import { CgClose } from 'react-icons/cg';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal-root');
export const Modal = ({ closeModal, largeImageURL, query }) => {
  useEffect(() => {
    const closeByEsc = e => {
      if (e.code === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', closeByEsc);
    return () => {
      window.removeEventListener('keydown', closeByEsc);
    };
  }, [closeModal]);

  const closeOnOverlayCLick = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return createPortal(
    <div className={s.Overlay} onClick={closeOnOverlayCLick}>
      <div className={s.Modal}>
        <button
          className={s.CloseBtn}
          type="button"
          onClick={() => closeModal()}
        >
          <IconContext.Provider value={{ size: 30, color: 'white' }}>
            <CgClose />
          </IconContext.Provider>
        </button>
        <img className={s.Modal__image} src={largeImageURL} alt={query} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  query: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
