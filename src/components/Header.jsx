import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

const Header = (props) => {
  let headerLink;

  if (props.page === 'signin') {
    headerLink = <NavLink to='/signup' className='header__link'>Регистрация</NavLink>
  } else if (props.page === 'signup') {
    headerLink = <NavLink to='/signin' className='header__link'>Войти</NavLink>
  } else if (props.page === 'feed') {
    headerLink = 
    <nav className='header__nav'>
      <p className="header__info">{props.userData.email}</p>
      <NavLink to='/login' className='header__link header__link_signout' onClick={props.handleSignOut}>Выйти</NavLink>
    </nav>
  }

  return (
    <header className='header'>
      <img src={logo} alt='логотип место' className='header__logo' />
      {headerLink}
    </header>
  );
};

export default Header;
