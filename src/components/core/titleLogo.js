import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../img/titleLogo.svg';

const TitleLogo = (props) => {
  return (
    <NavLink to="/" exact>
      <img className="core-title-logo" src={logo} alt="lor_logo" />
    </NavLink>
  );
};

export default TitleLogo;
