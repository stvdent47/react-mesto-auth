import React from 'react';
import Header from './Header.jsx';

const Register = (props) => {
  return (
    <>
      <Header />
      <div className='login'>
        <h1 className='login__title'>Регистрация</h1>
        <input type='text' className='login__input' placeholder='Email' />
        <input type='text' className='login__input' placeholder='Пароль' />

        <button type='submit'>Зарегистрироваться</button>
        <p>Уже зарегистрированы?</p>
        <a href='/login'>Войти</a>
      </div>
    </>
  );
};

export default Register;
