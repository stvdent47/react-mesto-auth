import React, { useState } from 'react';
import Header from './Header.jsx';

const Login = (props) => {
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
    props.handleLogin(email, password);
  };

  return (
    <>
      <Header page='signin' />
      <div className='login'>
        <div className='login__containter'>
          <h1 className='login__title'>Вход</h1>
          <form onSubmit={handleSubmit}>
            <input
              type='email'
              name='email'
              className='login__input'
              placeholder='Email'
              value={userData.email}
              onChange={handleInputChange}
            />
            <input
              type='password'
              name='password'
              className='login__input'
              placeholder='Пароль'
              value={userData.password}
              onChange={handleInputChange}
            />
            <div className='login__button-containter'>
              <button type='submit' className='login__button'>
                Войти
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
