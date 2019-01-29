import React, { Component } from 'react';
import { ReactTypeformEmbed } from 'react-typeform-embed';
import '../../styles/style.scss';

/* eslint no-return-assign: 0  */

class Feedback extends Component {
  constructor(props) {
    super(props);
    this.openForm = this.openForm.bind(this);
  }

  openForm() {
    this.typeformEmbed.typeform.open();
  }

  render() {
    return (
      <div>
        <ReactTypeformEmbed
          popup
          url="https://alexanderdanilowicz.typeform.com/to/nx6ot4"
          ref={(tf => this.typeformEmbed = tf)}
          style={{ position: 'static', height: 0 }}
        />
        <button id="feedback-link" onClick={this.openForm}>Have Feedback?</button>
      </div>
    );
  }
}

export default Feedback;
