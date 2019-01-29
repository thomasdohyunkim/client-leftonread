/* eslint global-require: 0 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import 'animate.css/animate.min.css';
import ScrollAnimation from 'react-animate-on-scroll';
import ReactGA from 'react-ga';
import Fade from 'react-reveal/Fade';
import Typing from 'react-typing-animation';
import friends from '../img/friends.png';
import graph from '../img/graph.png';
import shield from '../img/shield.png';
import scroll from '../img/scroll.gif';
import messages from '../img/apple-messages.png';
import Footer from './footer';

import '../styles/landing.scss';

/* eslint max-len: 0 */

// <div className="main-read"> Read {time} </div>

const Landing = (props) => {
  // for Google Analytics
  ReactGA.event({
    category: 'Landing',
    action: 'landing page was rendered',
    label: 'render',
  });

  return (
    <div className="landing-container">
      <div className="landing-section">
        <Fade top distance="20px">
          <div className="main-bubble">
            <div id="landing-page-center-title"> Left On Read </div>
            <div id="landing-page-motto">
              <Typing speed={70} loop cursorClassName="typing-cursor">
                Analyze your iMessages.
                <Typing.Delay ms={3500} />
                <Typing.Backspace count={23} />
                See your texting habits.
                <Typing.Delay ms={3500} />
                <Typing.Backspace count={24} />
                Learn who your friends are.
                <Typing.Delay ms={3500} />
                <Typing.Backspace count={27} />
              </Typing>
            </div>
            <div className="get-started-button-wrapper">
              <NavLink to="/starter"> <button>Get Started</button> </NavLink>
            </div>
          </div>
        </Fade>
        <img src={scroll} alt="scroll" className="main-scroll" />
      </div>
      <div id="highlights">
        <ScrollAnimation animateIn="fadeIn">
          <div className="highlight-card" >
            <div className="highlight-img">
              <span className="img-helper" />
              <img id="apple" src={messages} alt="iMessageLogo" />
            </div>
            <div className="highlight-text">
              <h1>iMessage Analyzer</h1>
              <h2>Left On Read provides statistical data about your texting habits. Currently, we work only with iMessages stored on macOS. Stay tuned, we plan on expanding soon. </h2>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn">
          <div className="highlight-card" >
            <div className="highlight-img">
              <span className="img-helper" />
              <img id="friends" src={friends} alt="TextingImage" />
            </div>
            <div className="highlight-text">
              <h1>Learn about how you text</h1>
              <h2>What word do you text the most? Favorite emoji? Top 5 friends? Do you text people more than they text you? Get started now.</h2>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn">
          <div className="highlight-card">
            <div className="highlight-img">
              <span className="img-helper" />
              <img src={graph} alt="Graph" />
            </div>
            <div className="highlight-text">
              <h1>Beautiful, intuitive data</h1>
              <h2>Our goal is to communicate data clearly and effectively. We designed our analytics with the user experience in mind. All for free.</h2>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeIn">
          <div className="highlight-card">
            <div className="highlight-img">
              <span className="img-helper" />
              <img src={shield} alt="Privacy" />
            </div>
            <div className="highlight-text">
              <h1>Your privacy is our #1 concern</h1>
              <h2>
                We never save your conversations and we never see any images. After your chat file is queried, we promptly delete it. Then, we anonymously save your graphs and analytics, so you can choose to share it with friends. On top of that, your unique link will only last for 48 hours.
              </h2>
            </div>
          </div>
        </ScrollAnimation>
      </div>
      <Footer />
    </div>
  );
};


export default Landing;
