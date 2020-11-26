import React from 'react';

const PopupWithForm = (props) => {
  return (
    <div className={`modal ${props.name} ${props.isOpen ? 'modal_opened' : ''}`}>
      <div className='modal__container'>
        <h2 className='modal__title'>{props.title}</h2>

        <form
          action='#'
          name={`form-${props.name}`}
          className='modal__form'
          method='POST'
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button type='submit' className='modal__button'>
            {props.submitButtonState}
          </button>
        </form>

        <button
          className='modal__close-button'
          type='button'
          aria-label='Закрыть'
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;