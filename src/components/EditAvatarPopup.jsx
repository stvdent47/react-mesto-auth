import React, { useRef } from 'react';
import PopupWithForm from './PopupWithForm.jsx'

const EditAvatarPopup = (props) => {
  const inputRef = useRef();
  const handleAvatarUpdateSubmit = (e) => {
    e.preventDefault();

    props.onUpdateAvatar(inputRef.current.value);
    inputRef.current.value = '';
  }

  return (
    <PopupWithForm
        name='avatar-update-modal'
        title='Обновить аватар'
        submitButtonState={props.submitButtonState}
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleAvatarUpdateSubmit}
        children={
          <>
            <input
              ref={inputRef}
              type='url'
              name='avatar-link'
              id='avatar-link-input'
              placeholder='Ссылка на картинку'
              className='modal__input'
              required
            />
            <p
              className='modal__input-error-message'
              id='avatar-link-error'
            ></p>
          </>
        }
      />
  )
}

export default EditAvatarPopup;