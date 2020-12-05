import React from 'react';
import resultFail from '../images/signup-modal-result-fail.svg';
import resultSuccess from '../images/signup-modal-result-success.svg';

const SignupResultModal = (props) => {
  let resultText;
  let resultImg;

  if (props.signupResult === true) {
    resultText = 'Вы успешно зарегистрировались!';
    resultImg = resultSuccess;
  } else {
    resultText = 'Что-то пошло не так! Попробуйте ещё раз.';
    resultImg = resultFail;
  }
  return (
    <div className={`signup-modal ${props.isOpen ? 'signup-modal_opened' : ''}`}>
      <div className='signup-modal__container'>
        <img src={resultImg} alt='картинка результата' className='signup-modal__img' />
        <p className='signup-modal__text'>{resultText}</p>
        <button className='signup-modal__close-button' onClick={props.onClose} />
      </div>
    </div>
  );
};

export default SignupResultModal;
