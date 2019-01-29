import React from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';

import '../../styles/generic.scss';
import '../../styles/core.scss';

import { signOutUser } from '../../actions/userActions';

const Account = (props) => {
  if (!props.auth.authenticated) {
    return (
      <div className="account-actions">
        <span className="link-animated account-login" onClick={props.onSignIn} role="button" tabIndex={0}> Login </span>
        <NavLink to="/signup" className="account-action">
          <span className="link-animated account-signup"> Create an account </span>
        </NavLink>
      </div>
    );
  }

  const onSignOut = () => {
    props.signOutUser();
  };

  return (
    <div className="account-actions account-in">
      <span> Signed in as <strong>{props.auth.email}</strong>. &nbsp; </span>
      <span className="link-animated" onClick={onSignOut} role="button" tabIndex={0}> Log out </span>
    </div>
  );
};

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, { signOutUser })(Account));
