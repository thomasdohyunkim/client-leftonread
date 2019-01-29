import React, { Component } from 'react';
import { toast } from 'react-toastify';

import '../../styles/editor.scss';
import '../../styles/core.scss';

class SignUpEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      email: '',
      password: '',
      repassword: '',
    };

    this.submitSignUp = this.submitSignUp.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validateFields = this.validateFields.bind(this);
  }

  handleChange(e) {
    // this.props.validateField(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitSignUp(e) {
    if (this.validateFields() === null) {
      const user = {
        firstName: this.state.firstName,
        email: this.state.email,
        password: this.state.password,
      };
      this.props.signUpCallback(user);
    } else {
      toast.error('Please address error(s)');
    }
  }

  validateFields() {
    let error = null;
    const re = /[0-9]/;
    // Passwords must be at least 8 characters long, and contain at least one number
    if (this.state.firstName === '' || this.state.email === '') {
      error = 'Please fill in all fields';
    } else if (this.state.password.length < 8) {
      error = 'Password must be 8 characters or more';
    } else if (!re.test(this.state.password)) {
      error = 'Password must contain at least one number';
    } else if (this.state.password != this.state.repassword) {
      error = 'Passwords must match';
    }
    return error;
  }

  render() {
    const err = this.validateFields();
    const valid = err === null ? null : <span className="user-required-star"> {err} </span>;

    return (
      <div className="user-editor-container">
        <div className="user-field-title"> First Name: <span className="user-required-star"> * </span> </div>
        <input className="user-field-input" onChange={this.handleChange} type="text" name="firstName" value={this.state.firstName} />
        <div className="user-field-title"> Email: <span className="user-required-star"> * </span></div>
        <input className="user-field-input" onChange={this.handleChange} type="text" name="email" value={this.state.email} />
        <div className="user-field-title"> Password: <span className="user-required-star"> * </span></div>
        <input className="user-field-input" onChange={this.handleChange} type="password" name="password" value={this.state.password} />
        <div className="user-field-title"> Retype Password: <span className="user-required-star"> * </span></div>
        <input className="user-field-input" onChange={this.handleChange} type="password" name="repassword" value={this.state.repassword} />
        <br />
        {valid}
        <br />
        <button className="user-field-button" id="signup-button" tabIndex="0" onClick={this.submitSignUp}> Sign Up </button>
        <br />
        <br />
        <div className="user-field-helper"> <span className="user-required-star"> * </span> indicates a required field </div>
      </div>
    );
  }
}

export default SignUpEditor;
