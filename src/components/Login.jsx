import React from 'react';
import Header from './Header.jsx';

const Login = (props) => {
  return (
    <>
      <Header page='register' />
      <div className='login'>
        <div className='login__containter'>
          <h1 className='login__title'>Вход</h1>
          <input
            type='email'
            name='email'
            className='login__input'
            placeholder='Email'
          />
          <input
            type='password'
            name='password'
            className='login__input'
            placeholder='Пароль'
          />
        </div>

        <div className='login__button-containter'>
          <button type='submit' className='login__button'>
            Зарегистрироваться
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
