import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from './Header.jsx';
import * as auth from '../utils/auth.js';

const Register = (props) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const history = useHistory();

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
    console.log(userData)
    auth
      .signup(email, password)
      .then((res) => {
        console.log(res)
        if (res) {
          history.push('/login');
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header page='login' />
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
