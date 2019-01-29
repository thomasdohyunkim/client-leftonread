import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function (ComposedComponent) {
  class RequireAuth extends Component {
    componentWillMount() {
      if (!this.props.auth) {
        this.props.history.push('/signup');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.auth) {
        this.props.history.push('/signup');
      }
    }

    render() {
      return (
        <ComposedComponent {...this.props} />
      );
    }
  }

  const mapStateToProps = state => (
    {
      auth: state.auth.authenticated,
    }
  );

  return connect(mapStateToProps, null)(RequireAuth);
}
