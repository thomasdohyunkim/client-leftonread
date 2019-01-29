import React, { Component } from 'react';
import { Widget, addResponseMessage, renderCustomComponent } from 'react-chat-widget';
import ReactGA from 'react-ga';
import 'react-chat-widget/lib/styles.css';
import '../../styles/imessage.scss';

class iMessageSimulator extends Component {
  componentDidMount() {
    renderCustomComponent(this.getTimeElement);
  }

  getTimeElement = () => {
    const d = new Date();
    const h = d.getHours();
    const m = `${d.getMinutes()}`;
    const dispH = h % 12;
    const dispM = m.length == 1 ? `0${m}` : m;
    const dispAmpm = h >= 12 ? 'PM' : 'AM';
    const disp = `Today, ${dispH}:${dispM} ${dispAmpm}`;
    return (<div className="imessage-time"> {disp}  </div>);
  }

  sendUserMessage = (message) => {
    // for Google Analytics
    ReactGA.event({
      category: 'Loading',
      action: 'a user sent a message to the chatbot',
      label: 'interaction',
    });
    addResponseMessage(message);
  }

  checkContains = (message, keywords) => {
    const sanitizeMessage = message.toLowerCase();
    for (let i = 0; i < keywords.length; i += 1) {
      if (sanitizeMessage.indexOf(keywords[i]) >= 0) {
        return true;
      }
    }
    return false;
  }

  randomResponse = (responses) => {
    return responses[Math.floor(Math.random() * responses.length)];
  }

  handleNewUserMessage = (message) => {
    let response = null;

    const hiKeywords = ['hi', 'hello', 'hey'];
    const hiResponses = ['Howdy!', 'Hi there!', 'Hello!'];

    const supKeywords = ['whats up', 'whatsup', 'up', 'sup', 'wassup'];
    const supResponses = ['Nothin much, you?', 'Just analyzing some data', 'The sky technically?'];

    const coolKeywords = ['cool', 'sick', 'awesome', 'nice'];
    const coolResponses = ['Wow, thanks!', 'You\re not too bad yourself', 'Glad you love it!'];

    const suckKeywords = ['sucks', 'suck', 'blow', 'bad', 'dumb', 'stupid'];
    const suckResponses = ['That\'s not very nice...', 'Good thing I have no feelings!', 'I know what you are, but what am I?'];

    const broKeywords = ['bro', 'bruh', 'broo', 'brooo', 'dude'];
    const broResponses = ['You\'re so sick bro'];

    if (this.checkContains(message, hiKeywords)) {
      response = this.randomResponse(hiResponses);
    } else if (this.checkContains(message, supKeywords)) {
      response = this.randomResponse(supResponses);
    } else if (this.checkContains(message, coolKeywords)) {
      response = this.randomResponse(coolResponses);
    } else if (this.checkContains(message, suckKeywords)) {
      response = this.randomResponse(suckResponses);
    } else if (this.checkContains(message, broKeywords)) {
      response = this.randomResponse(broResponses);
    }
    if (response) {
      addResponseMessage(response);
    }
  }

  render() {
    return (
      <div className="loading-screen">
        <div className="imessage-container">
          <Widget
            handleNewUserMessage={this.handleNewUserMessage}
            senderPlaceHolder="iMessage"
          />
        </div>
      </div>
    );
  }
}

export default iMessageSimulator;
