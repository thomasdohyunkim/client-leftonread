import React from 'react';
import { NavLink } from 'react-router-dom';
import Feedback from '../static/feedback';
import logo from '../../img/logo_new.svg';


const Footer = (props) => {
  return (
    <footer>
      <div className="footer-container">
        <div className="version-container">
          <a href="https://leftonread.me/">
            <img src={logo} alt="Left On Read" />
          </a>
          <p>v1.4</p>
        </div>
        <div className="open-source-container">
          <div className="github">
            <a id="dont-trust" href="https://github.com/alexdanilowicz/client-leftonread">{'Don\'t Trust Us? We\'re on GitHub. '}
              <i className="fab fa-github" />
            </a>
          </div>
        </div>
        <div className="donate-container">
          <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank" id="paypal">
            <input type="hidden" name="cmd" value="_s-xclick" />
            <input type="hidden" name="hosted_button_id" value="XFRVNFQ67LBTS" />
            <button type="submit">Donate &nbsp;
              <i className="fab fa-paypal" />
            </button>
          </form>
        </div>
        <div>
          <NavLink to="/blog"><p>Blog</p></NavLink>
        </div>
        <div className="feedback-container">
          <Feedback />
        </div>
        <div>
          <NavLink to="/privacypolicy"><p>Privacy Policy</p></NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
