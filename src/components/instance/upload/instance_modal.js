import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-responsive-modal';

import UploadProgress from './upload_progress';
import SignInEditor from '../../users/signInEditor';

import { linkInstance } from '../../../actions/uploadActions';
import { signInUser, signOutUser } from '../../../actions/userActions';

import '../../../styles/core.scss';
import '../../../styles/modals.scss';
import '../../../styles/upload.scss';

class InstanceModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      attempt: 0, // 0 -> have not attempted, 1->currently rendering, 2->failed
      lastPct: props.instance.pct,
      stalledTxt: (<br />),
    };

    this.logout = this.logout.bind(this);
    this.signInSubmit = this.signInSubmit.bind(this);
    this.signInCallback = this.signInCallback.bind(this);
    this.renderSignIn = this.renderSignIn.bind(this);
    this.checkPct = this.checkPct.bind(this);
    this.finish = this.finish.bind(this);

    // Check percentages every 15 seconds
    this.checkPctTimer = setInterval(this.checkPct, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.checkPctTimer);
  }

  logout() {
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
    } else {
      this.setState({
        attempt: 2,
      });
    }
  }

  checkPct() {
    if (this.props.instance.pct === this.state.lastPct && this.props.instance.pct != 100) {
      this.setState({
        stalledTxt: (
          <div className="instance-modal-stalled">
            Stalled? Make sure you have a valid internet connection,
            refresh the page, and reupload.
          </div>),
      });
    } else {
      this.setState({
        lastPct: this.props.instance.pct,
        stalledTxt: (<br />),
      });
    }
  }

  finish() {
    this.props.linkInstance(this.props.instance.key, this.props.instance.vcf);
    this.props.onInstanceClose();
  }

  renderSignIn() {
    const isLoading = this.state.attempt === 1;
    const isFinished = this.props.instance.pct === 100;

    if (this.props.auth.authenticated) {
      return (
        <div className="instance-modal-finish-container">
          <div className="instance-modal-link instance-modal-logged">
            <div> Logged in as <strong> {this.props.auth.email} </strong> </div>
            <div className="instance-modal-not-you"> Not you? <span onClick={this.logout} className="link-animated" role="button" tabIndex={-1}> <strong> Log out </strong> </span> </div>
          </div>
          <button className="action-button instance-modal-finish-button" onClick={this.finish} disabled={!isFinished}> Finish </button>
        </div>
      );
    } else {
      const setSignUpToken = () => {
        localStorage.setItem('signUpRedirect', true);
      };

      return (
        <div>
          <div className="instance-modal-link">
            <span> Dont have an account? </span>
            <NavLink to="/signup" target="_blank" onClick={setSignUpToken}> <span className="link-animated" onClick={setSignUpToken} role="button" tabIndex={-1} > Create one here. </span> </NavLink>
          </div>
          <SignInEditor
            isLoading={isLoading}
            signInCallback={this.signInSubmit}
          />
        </div>
      );
    }
  }

  render() {
    const uploadTitle = this.props.instance.pct === 100 ?
      'UPLOAD COMPLETE' : 'UPLOADING';

    let warning = null;
    if (this.props.instance.pct == 100 && this.props.auth.authenticated) {
      warning = (<br />);
    } else if (this.props.instance.pct == 100) {
      warning = (<div className="instance-modal-success"> <span className="instance-modal-warning"> PLEASE LOGIN TO FINISH. </span> </div>);
    } else {
      warning = (<div className="instance-modal-warning"> PLEASE DO NOT CLOSE WHILE UPLOAD IS IN PROGRESS </div>);
    }

    // const warning = this.props.instance.pct === 100 ?
    //   (<div className="instance-modal-success"> <span className="instance-modal-warning"> PLEASE LOGIN TO FINISH. </span> </div>) :
    //   (<div className="instance-modal-warning"> PLEASE DO NOT CLOSE WHILE UPLOAD IS IN PROGRESS </div>);
    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onInstanceClose}
        classNames={{
                modal: 'modal-resp',
              }}
        center
        closeOnOverlayClick={false}
        showCloseIcon={false}
      >
        <div className="instance-modal">
          <div className="instance-modal-title"> {uploadTitle} </div>
          {warning}
          <div className="instance-modal-pct"> {Math.round(this.props.instance.pct)}% </div>
          <UploadProgress />
          {this.state.stalledTxt}
          <br />
          <br />
          <br />
          <div className="instance-modal-title"> LAST STEP, SIGN IN </div>
          {this.renderSignIn()}
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
    instance: state.instance,
  }
);

export default withRouter(connect(mapStateToProps, {
  signInUser,
  signOutUser,
  linkInstance,
})(InstanceModal));
