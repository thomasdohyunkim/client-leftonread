import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import Account from '../core/account';
import Logo from '../core/logo';
import LandingInfo from './landing_info';
import LandingData from './landing_data';
import LandingGraph from './landing_graph';
import LandingPrivacy from './landing_privacy';
import Back from '../../img/landing/back.svg';
import SignInModal from '../users/signInModal';

import '../../styles/landing2.scss';

class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      signInModal: false,
    };

    this.openSignInModal = this.openSignInModal.bind(this);
    this.closeSignInModal = this.closeSignInModal.bind(this);
  }

  openSignInModal() {
    this.setState({
      signInModal: true,
    });
  }

  closeSignInModal() {
    this.setState({
      signInModal: false,
    });
  }

  render() {
    return (
      <div id="landing">
        <img id="landing-back" src={Back} alt="Background" />
        <Logo />
        <Account onSignIn={this.openSignInModal} />
        <SignInModal open={this.state.signInModal} onClose={this.closeSignInModal} />
        <div id="landing-content">
          <div className="landing-section landing-section-center landing-section-1">
            <Fade top distance="30px">
              <div className="landing-title">
                <span id="landing-left"> LEFT </span>
                <span id="landing-on"> ON </span>
                <span id="landing-space">  &nbsp; </span>
                <span id="landing-read"> READ </span>
              </div>
            </Fade>
            <div className="landing-subtitle">
              <span> What can you learn from your text messages? </span>
            </div>
            <div className="action-button landing-started">
              <NavLink to="/starter"> <button> Analyze now </button> </NavLink>
            </div>
          </div>
          <LandingInfo />
          <LandingData />
          <LandingGraph />
          <LandingPrivacy />
        </div>
      </div>
    );
  }
}

export default Landing;
