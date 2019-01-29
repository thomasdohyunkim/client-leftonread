/* Author: Left On Read
 * Date: 5/20/2018
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addResponseMessage, renderCustomComponent } from 'react-chat-widget';
import { toast } from 'react-toastify';
import { getInstance } from '../../actions';
import IMessage from './imessage_widget';
import Countdown from '../core/countdown';
// const TOTAL_MESSAGES =
/*
 * Loading Page
 * Specifically for when a new instance is being populated
 */
class Loader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receivedLogItems: [],
      renderedLogItems: [],
    };

    this.expectedMessages = 9;

    this.pollInstance = this.pollInstance.bind(this);
    this.refreshInstance = this.refreshInstance.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.sendMessagesWithDelay = this.sendMessagesWithDelay.bind(this);
  }

  componentDidMount() {
    // If no key, redirect
    if (!this.props.current.instance.key) {
      this.props.history.push('/starter');
      return;
    }

    this.sendMessage('Hello, I am a bot! Chat with me below while we load your graphs.');
    setTimeout(() => {
      this.sendMessage('You can use your unique key to come back to your analytics without having to upload again. Your secure key is:');
      this.sendMessage(this.props.current.instance.key);
    }, 500);

    // Poll for updates every 3 seconds
    this.pollTimer = setInterval(this.pollInstance, 1000);
    // Tries to update every 3 seconds, with 1s delay from polling
    setTimeout(() => {
      this.refreshTimer = setInterval(this.refreshInstance, 1000);
    }, 1000);
    this.props.getInstance(this.props.history, this.props.current.instance.key);
  }

  componentWillUnmount() {
    clearInterval(this.pollTimer);
    clearInterval(this.refreshTimer);
  }

  pollInstance() {
    if (this.props.error) {
      clearInterval(this.pollTimer);
      clearInterval(this.refreshTimer);
      toast.error('There was an error reading your chat.db file. Please make sure you upload a correct chat.db file.');
      this.props.history.push('/starter');
      return;
    }
    this.props.getInstance(this.props.history, this.props.current.instance.key);
  }

  refreshInstance() {
    const newItems = [];
    for (let i = 0; i < this.props.current.instance.log.length; i += 1) {
      const item = this.props.current.instance.log[i];

      // Check if we're expected contact checks
      if (item.indexOf('contact') >= 0) {
        this.expectedMessages = 10;
      }
      if (!this.state.receivedLogItems.includes(item)) {
        newItems.push(item);
        this.state.receivedLogItems.push(item);
      }
    }

    if (this.props.current.instance.status === 'complete' && this.state.renderedLogItems.length >= this.expectedMessages) {
      const finishedMessage = () => {
        return (
          <div className="response">
            <div className="message-text">
              <p> Graphs created! Redirecting to analytics page in <Countdown start={3} /> seconds </p>
            </div>
          </div>
        );
      };

      renderCustomComponent(finishedMessage);
      clearInterval(this.pollTimer);
      clearInterval(this.refreshTimer);
      setTimeout(() => {
        this.props.history.push('/overview');
      }, 5500);
    }

    this.sendMessagesWithDelay(newItems);
  }

  sendMessagesWithDelay = (newItems) => {
    if (!newItems) {
      return;
    }
    let i = 0;
    const msgDelay = setInterval(() => {
      if (i == newItems.length) {
        clearInterval(msgDelay);
        return;
      }
      this.sendMessage(newItems[i]);
      i += 1;
    }, 500);
  }

  sendMessage = (msg) => {
    this.state.renderedLogItems.push(msg);
    addResponseMessage(msg);
  }


  render() {
    return (
      <div>
        <IMessage />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  error: state.error,
  current: state,
});

export default connect(mapStateToProps, { getInstance })(Loader);
