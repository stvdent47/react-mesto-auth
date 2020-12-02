import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = (props) => {
  let headerLink;
  if (props.page === 'login') {
    headerLink = <NavLink to='/login' className='header__link'>Войти</NavLink>
  } else if (props.page === 'register') {
    headerLink = <NavLink to='/register' className='header__link'>Регистрация</NavLink>
  }

  return (
    <header className='header'>
      <img src={logo} alt='логотип место' className='header__logo' />
      {/* {props.page === 'login' ? (
        <NavLink to='/login' className='header__link'>Войти</NavLink>
      ) : (
        <NavLink to='/register' className='header__link'>Регистрация</NavLink>
      )} */}
      {headerLink}
    </header>
  );
};

export default Header;
