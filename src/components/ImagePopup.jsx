import React from 'react';

const ImagePopup = (props) => {
  return (
    <>
      <div
        className={`${props.name} ${props.isOpen ? 'pic-modal_opened' : ''}`}
      >
        <div className='pic-modal__container'>
          <figure className='pic-modal__picture'>
            <img
              src={props.card.link}
              alt={props.card.name}
              className='pic-modal__image'
            />
            <figcaption className='pic-modal__caption'>
              {props.card.name}
            </figcaption>
          </figure>

          <button
            className='pic-modal__close-button'
            type='button'
            aria-label='Закрыть'
            onClick={props.onClose}
          ></button>
        </div>
      </div>
    </>
  );
};

export default ImagePopup;
