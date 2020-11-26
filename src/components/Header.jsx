import React from 'react';
import logo from '../images/logo.svg';

const Header = (props) => {
  return (
    <header className='header'>
      <img src={logo} alt='логотип место' className='header__logo' />
    </header>
  );
}

export default Header;