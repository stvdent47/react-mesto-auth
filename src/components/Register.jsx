import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import InfoTooltip from './InfoTooltip.jsx';

const Register = (props) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const { email, password } = userData;
    props.handleSignup(email, password);
  };  

  return (
    <>
      <Header page='signup' />
      <div className='login'>
        <div className='login__containter'>
          <h1 className='login__title'>Регистрация</h1>
          <form onSubmit={handleSubmit} className='login__form'>
            <input
              id='email'
              name='email'
              type='email'
              className='login__input'
              placeholder='Email'
              value={userData.email}
              onChange={handleInputChange}
            />
            <input
              id='password'
              name='password'
              type='password'
              className='login__input'
              placeholder='Пароль'
              value={userData.password}
              onChange={handleInputChange}
            />

            <button type='submit' className='login__button'>
              Зарегистрироваться
            </button>
          </form>
        </div>

        <div className='login__button-containter'>
          <div className='login__button-caption'>
            <span>Уже зарегистрированы?</span>
            <Link to='/signin' className='login__link'>
              Войти
            </Link>
          </div>
        </div>
      </div>

      <InfoTooltip signupResult={props.signupResult} isOpen={props.isSignupModalOpen} onClose={props.onClose} resultText={props.resultText} />
    </>
  );
};

export default Register;
