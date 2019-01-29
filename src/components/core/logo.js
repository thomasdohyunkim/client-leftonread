import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../img/logo_new.svg';

const Logo = (props) => {
  return (
    <NavLink className="home-button" to="/" exact>
      <img id="home" src={logo} alt="lor_logo" />
    </NavLink>
  );
};

export default Logo;
