import React, { Component } from 'react';
import { connect } from 'react-redux';

class DotDotDot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numDots: 3,
    };

    this.interval = null;

    this.refreshDots = this.refreshDots.bind(this);
  }

  componentDidMount() {
    const rate = this.props.rate ? this.props.rate : 500;
    this.interval = setInterval(this.refreshDots, rate);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshDots() {
    if (this.props.error) {
      this.props.onErr();
      clearInterval(this.interval);
      return;
    }
    const newDots = (this.state.numDots + 1) % 4;
    this.setState({
      numDots: newDots,
    });
  }

  render() {
    let dots = '   ';
    switch (this.state.numDots) {
      case 0:
        dots = '   ';
        break;
      case 1:
        dots = '.  ';
        break;
      case 2:
        dots = '.. ';
        break;
      case 3:
        dots = '...';
        break;
      default:
        dots = '...';
    }

    return (
      <span style={{ whiteSpace: 'pre' }}> {dots} </span>
    );
  }
}
const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps, null)(DotDotDot);
