import React, { Component } from 'react';

class Countdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      num: this.props.start,
    };

    this.interval = null;

    this.refreshNum = this.refreshNum.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(this.refreshNum, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  refreshNum() {
    if (this.state.num == 0) {
      clearInterval(this.interval);
      return;
    }
    this.setState({
      num: this.state.num - 1,
    });
  }

  render() {
    return (
      <span> {this.state.num} </span>
    );
  }
}

export default Countdown;
