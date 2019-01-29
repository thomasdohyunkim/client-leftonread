import React, { Component } from 'react';

import '../../styles/editor.scss';
import '../../styles/core.scss';

class LoginEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
    this.submitSignUp = this.submitSignUp.bind(this);
  }

  submitSignUp() {
    if (this.validateFields() === null) {
      const user = {
        email: this.state.email,
        password: this.state.password,
      };
      this.props.signInCallback(user);
    }
  }

  handleChange(e) {
    // this.props.validateField(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  validateFields() {
    let error = null;
    // Passwords must be at least 8 characters long, and contain at least one number
    if (this.state.email === '' || this.state.password === '') {
      error = 'Please fill in all fields';
    }
    // Temporarily allow any input
    error = null;
    return error;
  }

  render() {
    let action = null;
    if (this.props.isLoading) {
      action = (
        <div className="graph-loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle className="path" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
          </svg>
        </div>);
    } else {
      action = <button className="user-field-button" id="signup-button" tabIndex="0" onClick={this.submitSignUp}> Login </button>;
    }
    return (
      <div className="user-editor-container">
        <div className="user-field-title"> Email: <span className="user-required-star"> * </span></div>
        <input className="user-field-input" onChange={this.handleChange} type="text" name="email" value={this.state.email} />
        <div className="user-field-title"> Password: <span className="user-required-star"> * </span></div>
        <input className="user-field-input" onChange={this.handleChange} type="password" name="password" value={this.state.password} />
        <br />
        <br />
        {action}
        <br />
        <br />
        <div className="user-field-helper"> <span className="user-required-star"> * </span> indicates a required field </div>
      </div>
    );
  }
}

export default LoginEditor;
