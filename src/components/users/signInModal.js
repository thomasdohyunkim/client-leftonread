import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Modal from 'react-responsive-modal';

import SignInEditor from './signInEditor';
import { signInUser, signOutUser } from '../../actions/userActions';

// Accepts prop to determine if modal should be shown
class SignInModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attempt: 0, // 0 -> have not attempted, 1->currently rendering, 2->failed
    };

    this.onLogout = this.onLogout.bind(this);
    this.signInSubmit = this.signInSubmit.bind(this);
    this.signInCallback = this.signInCallback.bind(this);
    this.renderAlreadyAuth = this.renderAlreadyAuth.bind(this);
  }

  onLogout() {
    this.props.signOutUser();
  }

  signInSubmit(user) {
    this.setState({
      attempt: 1,
    });
    this.props.signInUser(user, this.signInCallback);
  }

  signInCallback(success) {
    if (success) {
      this.setState({
        attempt: 0,
      });
      this.props.onClose();
    } else {
      this.setState({
        attempt: 2,
      });
    }
  }

  renderAlreadyAuth() {
    return (
      <div className="modal-resp-authed">
        <span className="modal-resp-title"> SIGN IN </span>
        <br />
        <div className="modal-resp-already-auth"> Already logged in as <strong> {this.props.auth.email} </strong>. </div>
        <br />
        <div className="modal-resp-logout link-animated" onClick={this.onLogout} role="button" tabIndex={0}> Not you? Log out. </div>
        <br />
      </div>
    );
  }

  render() {
    // const error = this.state.attempt === 2 ? <span className="modal-resp-error"> Invalid username / password combination </span> : null;
    const isLoading = this.state.attempt === 1;


    let modalContent = (
      <div>
        <span className="modal-resp-title"> SIGN IN </span>
        <SignInEditor
          isLoading={isLoading}
          signInCallback={this.signInSubmit}
        />
      </div>
    );

    if (this.props.auth.authenticated) {
      modalContent = (
        <div>
          {this.renderAlreadyAuth()}
        </div>
      );
    }

    return (
      <Modal open={this.props.open}
        onClose={this.props.onClose}
        classNames={{
                modal: 'modal-resp',
              }}
        center
      >
        {modalContent}
      </Modal>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, {
  signInUser,
  signOutUser,
})(SignInModal));
