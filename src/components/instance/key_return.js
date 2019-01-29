import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import Fade from 'react-reveal/Fade';
import ReactGA from 'react-ga';
import { toast } from 'react-toastify';
import { returnKey } from '../../actions';
import logo from '../../img/logo.svg';
import '../../styles/keyreturn.scss';


class KeyReturn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      key: '',
      password: '',
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    if (this.state.key === '') {
      toast.error('You must fill out the key field');
      return;
    }
    ReactGA.event({
      category: 'Returning',
      action: 'returning user page was submitted',
      label: 'interaction',
    });
    this.props.returnKey(this.props.history, this.state.key, this.state.password);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    // for Google Analytics
    ReactGA.event({
      category: 'Returning',
      action: 'returning user page was visited',
      label: 'visited',
    });
    return (
      <div className="keyreturn-container">
        <NavLink className="home-button" to="/" exact>
          <img id="home" src={logo} alt="lor_logo" />
          <p className="overview-lor-title">Left On Read</p>
        </NavLink>
        <Fade top distance="10px">
          <div className="starter-header">Returning User</div>
          <div className="simple-link">
            <NavLink className="simple-link" to="/starter">First time? Click here use the uploader.</NavLink>
          </div>
        </Fade>
        <div className="keyreturn-instructions">
          Enter in your previous key and password combination to view a
          previous run. This 2-factor authentication ensures your data is safe.
        </div>
        <input id="first-input" type="text" placeholder="Your Unique Key" name="key" onChange={this.onChange} />
        <input type="password" placeholder="Password (if applicable)" name="password" onChange={this.onChange} />
        <button className="button" onClick={this.onSubmit}> Submit </button>
      </div>
    );
  }
}

export default withRouter(connect(null, { returnKey })(KeyReturn));
