import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = (props) => {
  return (
    <header className='header'>
      <img src={logo} alt='логотип место' className='header__logo' />
      {props.page === 'login' ? (
        <NavLink to='/login' className='header__link'>Войти</NavLink>
      ) : (
        <NavLink to='/register' className='header__link'>Регистрация</NavLink>
      )}
    </header>
  );
};

export default Header;
