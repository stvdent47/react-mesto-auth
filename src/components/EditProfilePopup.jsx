import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

const EditProfilePopup = (props) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    props.onUpdateUser({
      name,
      about: description,
    });
  };
  
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);
  
  return (
    <PopupWithForm
      name='edit-modal'
      title='Редактировать профиль'
      submitButtonState={props.submitButtonState}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleEditSubmit}
      children={
        <>
          <input
            type='text'
            name='profile-name'
            id='profile-name-input'
            placeholder='Ваше имя'
            className='modal__input'
            required
            minLength='2'
            maxLength='40'
            autoComplete='off'
            value={name}
            onChange={handleNameChange}
          />
          <p className='modal__input-error-message' id='profile-name-error'></p>
          <input
            type='text'
            name='profile-job'
            id='profile-job-input'
            placeholder='Ваша профессия'
            className='modal__input'
            required
            minLength='2'
            maxLength='200'
            autoComplete='off'
            value={description}
            onChange={handleDescriptionChange}
          />
          <p className='modal__input-error-message' id='profile-job-error'></p>
        </>
      }
    />
  );
};
export default EditProfilePopup;
