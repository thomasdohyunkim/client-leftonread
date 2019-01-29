import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../img/logo_new.svg';
import Footer from '../core/footer';

import '../../styles/starter.scss';
import '../../styles/landing.scss';

const Blog = (props) => {
  return (
    <div className="blog-wrapper">
      <div className="blog-header">
        <NavLink className="home-button" to="/" exact>
          <img id="home" src={logo} alt="lor_logo" />
        </NavLink>
        <div className="blog-title">
          <h1> Blog </h1>
        </div>
      </div>
      <div className="blog-text">
        <h2>
          <span>Hello World</span>
          <br />
          { ' Hi there! Thanks for checking out Left on Read. We\'re a group of Dartmouth students who made \
          this project, and we\'re super excited to share it with you. On this page, we\'ll be posting regular \
          updates on what we\'re working on or any major changes we make. In the meantime, please feel free to test \
          out our app and let us know how you like. If you\'re interested in learning more, you can also check out some \
          of our other pages below. ' }
          <br />
          <br />
        </h2>
      </div>
      <Footer />
    </div>
  );
};

export default Blog;
