/* Author: Left On Read
 * Date: 6/4/2018
 */
import React, { Component } from 'react';
import { BinaryFeedback } from 'react-simple-user-feedback';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { updateFeedback } from '../../../actions/feedbackActions';
/*
 * Card composed component that wraps graphs
 * Passes in a "focused" prop to the composed components to display more information
 */
export default function (ComposedComponent) {
  class cardWrapper extends Component {
    constructor(props) {
      super(props);
      this.renderDescription = this.renderDescription.bind(this);
      this.onPositiveClick = this.onPositiveClick.bind(this);
      this.onNegativeClick = this.onNegativeClick.bind(this);
    }

    onPositiveClick() {
      this.props.updateFeedback(this.props.metric, true);
    }

    onNegativeClick() {
      this.props.updateFeedback(this.props.metric, false);
    }

    // TODO: This logic really should be moved to the server or elsewhere...
    renderDescription() {
      if (this.props.metric === 'TOTAL_TEXTS') {
        return (<div className="graph-description">Note: We {'don\'t'} include group messages in our analysis.</div>);
      } else if (this.props.metric === 'TOP_FIVE_WORDS') {
        return (<div className="graph-description"> Your top 5 sent and received words.</div>);
      } else if (this.props.metric === 'TOP_FIVE_FRIENDS') {
        return (<div className="graph-description"> The friends you text the most. </div>);
      } else if (this.props.metric === 'RECONNECT') {
        return (<div className="graph-description"> People you have not texted in 2 weeks, but have a high love sentiment with. Perhaps send them a text? </div>);
      } else if (this.props.metric === 'SENTIMENTS') {
        return (<div className="graph-description"> Breaks down 5 major emotions within your texts. </div>);
      } else if (this.props.metric === 'SENTIMENT_TIME') {
        return (<div className="graph-description"> Your emotions over time.  </div>);
      } else if (this.props.metric === 'AVG_LENGTH') {
        return (<div className="graph-description"> The average length of your texts.  </div>);
      } else if (this.props.metric === 'WORD') {
        return (<div className="graph-description"> How many times you used a specific word  </div>);
      } else if (this.props.metric === 'TOP_FIVE_EMOJIS') {
        return (<div className="graph-description"> Which emojiis you most often use <span role="img" aria-label="fire">🔥</span>  </div>);
      } else if (this.props.metric === 'TEXTS_PER_DAY') {
        return (<div className="graph-description"> How many texts you send and receive over time. </div>);
      } else if (this.props.metric === 'TIME_OF_DAY') {
        return (<div className="graph-description"> The times of day you text the most. </div>);
      } else {
        return (<div />);
      }
    }

    render() {
      let wrapperClass = 'card-wrapper';
      if (this.props.big) {
        wrapperClass = 'card-wrapper card-big';
      }

      let pos = false;
      let neg = false;
      if (this.props.metric in this.props.feedback) {
        if (this.props.feedback[this.props.metric]) {
          pos = true;
        } else {
          neg = true;
        }
      }

      const feedback = this.props.metric ? (
        <BinaryFeedback
          onPositiveClick={this.onPositiveClick}
          onNegativeClick={this.onNegativeClick}
          positive={pos}
          negative={neg}
        />) : null;

      return (
        <div className={wrapperClass} role="button" tabIndex={0} onClick={this.onClick}>
          <ComposedComponent
            info={this.renderDescription()}
            focused
          />
          {feedback}
        </div>
      );
    }
  }

  const mapStateToProps = state => (
    {
      feedback: state.feedback,
    }
  );

  return withRouter(connect(mapStateToProps, {
    updateFeedback,
  })(cardWrapper));
}
