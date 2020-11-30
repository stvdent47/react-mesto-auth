import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';

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

  return (
    <>
      <Header />
      <div className='login'>
        <div className='login__containter'>
          <h1 className='login__title'>Регистрация</h1>
          <input
            type='email'
            name='email'
            className='login__input'
            placeholder='Email'
            onChange={handleInputChange}
            value={userData.email}
          />
          <input
            type='password'
            name='password'
            className='login__input'
            placeholder='Пароль'
            onChange={handleInputChange}
            value={userData.password}
          />
        </div>

        <div className='login__button-containter'>
          <button type='submit' className='login__button'>
            Зарегистрироваться
          </button>
          <div className='login__button-caption'>
            <span>Уже зарегистрированы?</span>
            <Link to='/login' className='login__link'>
              Войти
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
