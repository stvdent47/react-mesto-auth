import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';

const Register = (props) => {
  return (
    <>
      <Header />
      <div className='login'>
        <div className='login__containter'>
          <h1 className='login__title'>Регистрация</h1>
          <input type='text' className='login__input' placeholder='Email' />
          <input type='text' className='login__input' placeholder='Пароль' />
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
