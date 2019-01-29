import React, { Component } from 'react';
import Plx from 'react-plx';

const parallaxData = [
  {
    start: 'self',
    end: '#landing-data',
    endOffset: '100vh',
    properties: [
      {
        startValue: 0,
        endValue: 1,
        property: 'opacity',
      },
    ],
  },
];

class LandingInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div id="landing-info" className="landing-section">
        <Plx className="landing-section-title" parallaxData={parallaxData}>
          <span>
            LEARN ABOUT HOW YOU TEXT
          </span>
        </Plx>

        <div className="landing-section-content">
          What word do you text the most? Favorite emoji? Top 5 friends?
          Do you text people more than they text you?
          Who leaves who on read more often? Find out now.
        </div>

      </div>
    );
  }
}

export default LandingInfo;
