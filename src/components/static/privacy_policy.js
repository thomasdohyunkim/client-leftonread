import React from 'react';
import { NavLink } from 'react-router-dom';
import ReactGA from 'react-ga';
import logo from '../../img/logo.svg';
import Footer from '../core/footer';

import '../../styles/starter.scss';
import '../../styles/landing.scss';

const PrivacyPolicy = (props) => {
  // for Google Analytics
  ReactGA.event({
    category: 'PrivacyPolicy',
    action: 'policy policy page was rendered',
    label: 'render',
  });
  return (
    <div>
      <div className="privacyPolicyHeader">
        <NavLink className="home-button" to="/" exact>
          <img id="home" src={logo} alt="lor_logo" />
        </NavLink>
        <div className="ppTitle">
          <h1> Privacy Policy </h1>
        </div>
      </div>
      <div className="pp-text">
        <h2>
          <span>Left On Read Privacy Policy</span>
          <br />
          {'As we inherently deal with sensitive information, text messages, your privacy \
          is our #1 concern.This Privacy Policy describes how your personal information is \
          collected, used, and shared when you visit leftonread.me (the “Site”).'}
          <br />
          <br />
          <span>PERSONAL INFORMATION WE COLLECT</span>
          <br />
          {'When you visit the Site, we automatically collect certain information about your \
          device, including information about your web browser, IP address, time zone, as part \
          of our use of Google Analytics, which we outline in detail below. Additionally, through Google \
          Analytics, we collect what websites or search terms referred you to the Site, \
          and information about how you interact with the Site. We refer to this \
          automatically-collected information as “Device Information.”'}
          <br />
          <br />
          We collect Device Information using:
          <br />
          Google Analytics
          <br />
          -  “Log files” track actions occurring on the Site, and collect data including your IP address, browser
              type, Internet service provider, referring/exit pages, and date/time stamps.
          <br />
          - “Web beacons,” “tags,” and “pixels” are electronic files used to record information about how you browse the Site.
          <br />
          <br />
          <span>DATA RETENTION</span>
          <br />
          {'When you choose to upload your chat.db and your contacts file to our site, we query the \
          chat.db file and parse the .vcf to create your unique analytics page. After querying and \
          parsing is complete, we promptly delete the files. We do retain the data required to \
          render your unique analytics page ("Overview Page") for 48 hours. The data required \
          to render your analytics page is extracted from the files you uploaded and includes the words \
          you sent, the words you received, the frequency of those words, the length of each text, the dates you texted, \
          the time you texted, and the contact information of the people you texted. This data is only maintained for \
          48 hours from the moment you uploaded your file. After 48 hours, all of it is deleted. We store this data \
          because we cannot render your analytics page without it. We never share your analytics page. \
          The only way it can be shared is if you share its unique link.'}
          <br />
          <br />
          <span>SHARING YOUR INFORMATION AND DATA</span>
          <br />
          <div>We use Google Analytics to help us understand how our users use the Site: you can read more about how Google
          uses your Personal Information <a href="https://www.google.com/intl/en/policies/privacy/">here. </a>
          You can also opt-out of Google Analytics <a href="https://tools.google.com/dlpage/gaoptout">here</a>.
          </div>
          <br />
          {'Additionally, as mentioned above, you have the option to share your unique analytics page through your unique link. \
          Your analytics page only exists for 48 hours from the moment you create it. \
          After 48 hours, the link will become broken and your data is wiped. We will never share your analytics page automatically. \
          Your analytics page can only be shared if you share its link within the 48 hour timeframe. \
          Finally, we may also share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, \
          search warrant or other lawful request for information we receive, or to otherwise protect our rights.'}
          <br />
          <br />
          <span>CHANGES</span>
          <br />
          We may update this privacy policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal or regulatory reasons.
          <br />
          <br />
          <span>CONTACT US</span>
          <br />
          For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by email at
          <a href="mailto:leftonreadteam@gmail.com"> leftonreadteam@gmail.com</a> or by mail using the details provided below:
          <br />
          <br />
        Left On Read, 1090 Hinman, Dartmouth College, Hanover, NH, 03755, United States
        </h2>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
