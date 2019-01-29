import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

import SignUpEditor from './signUpEditor';
import SignInModal from './signInModal';
import Logo from '../core/logo';
import { signUpUser, signOutUser } from '../../actions/userActions';

import '../../styles/editor.scss';
import '../../styles/core.scss';

class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginOpen: false,
    };

    this.onLogout = this.onLogout.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
  }

  onLogout() {
    this.props.signOutUser();
  }

  openLoginModal() {
    this.setState({
      loginOpen: true,
    });
  }

  closeLoginModal() {
    this.setState({
      loginOpen: false,
    });
  }

  submitSignUp(user) {
    this.props.signUpUser(user, this.props.history);
  }

  render() {
    const authLink = !this.props.auth.authenticated ? (
      <div className="div-button" onClick={this.openLoginModal} role="button" tabIndex={0}>
        <span className="link-animated signup-already"> Already have an account? Login here </span>
      </div>
    ) : (
      <div className="div-button" onClick={this.onLogout} role="button" tabIndex={0}>
        <span className="signup-already"> Signed in as <strong> {this.props.auth.email} </strong>. </span>
        <span className="signup-already link-animated "> Not you? Log out here. </span>
      </div>
    );

    return (
      <div className="signup-page">
        <Logo />
        <SignInModal open={this.state.loginOpen} onClose={this.closeLoginModal} />
        <div className="signup-editor signup-container">
          <Fade top distance="30px">
            <span className="signup-title" id="signup-signup"> SIGN UP </span>
          </Fade>
          {authLink}
          <SignUpEditor signUpCallback={this.submitSignUp} />
        </div>
        <div className="signup-info signup-container">
          <Fade top distance="30px">
            <span className="signup-title" id="signup-why"> WHY? </span>
          </Fade>
          <div className="signup-why-container">
            <div>
              <div className="signup-why-title">
              Save you time!
              </div>
              <div className="signup-why-content">
              Due to heavy processing, the uploading of your file takes a while!
              Let us do all the hard work, and we will send you
              an email when your results are ready
              </div>
            </div>
            <div>
              <div className="signup-why-title">
              Easy Return!
              </div>
              <div className="signup-why-content">
              With accounts, you can log back in to see your results whenever
              you want, without the processing wait!
              </div>
            </div>
            <div>
              <div className="signup-why-title">
              Personal Progress
              </div>
              <div className="signup-why-content">
              By creating an account, you can see how you change over time. Come
              back in a few weeks to see if your habits have changed, or let us
              help you improve your habits!
              </div>
            </div>
            <div>
              <div className="signup-why-title">
              Personalized Experience
              </div>
              <div className="signup-why-content">
              An experienced tailored to you! User experience is one of our
              highest priorities!
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, {
  signUpUser,
  signOutUser,
})(SignUpPage));
