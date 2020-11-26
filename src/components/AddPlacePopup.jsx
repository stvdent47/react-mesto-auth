import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm.jsx';

const AddPlacePopup = (props) => {
  const [placeName, setPlaceName] = useState('');
  const [placeLink, setPlaceLink] = useState('');

  const handleAddPlaceSubmit = (e) => {
    e.preventDefault();

    props.onAddPlace({
      name: placeName,
      link: placeLink,
    });

    setPlaceName('');
    setPlaceLink('');
  };

  const handlePlaceNameInput = (e) => {
    setPlaceName(e.target.value);
  };
  const handlePlaceLinkInput = (e) => {
    setPlaceLink(e.target.value);
  };

  return (
    <PopupWithForm
      name='add-modal'
      title='Новое место'
      submitButtonState={props.submitButtonState}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleAddPlaceSubmit}
      children={
        <>
          <input
            type='text'
            name='place-name'
            id='place-name-input'
            placeholder='Название'
            className='modal__input'
            required
            minLength='1'
            maxLength='30'
            autoComplete='off'
            value={placeName}
            onChange={handlePlaceNameInput}
          />
          <p className='modal__input-error-message' id='place-name-error'></p>

          <input
            type='url'
            name='place-link'
            id='place-link-input'
            placeholder='Ссылка на картинку'
            className='modal__input'
            required
            value={placeLink}
            onChange={handlePlaceLinkInput}
          />
          <p className='modal__input-error-message' id='place-link-error'></p>
        </>
      }
    />
  );
};

export default AddPlacePopup;
