import React from 'react';
import Plx from 'react-plx';

import LandingExplosion from './landing_explosion';

const parallaxData = [
  {
    start: 'self',
    end: '.landing-graph',
    properties: [
      {
        startValue: 0,
        endValue: 40,
        property: 'translateX',
        unit: '%',
      },
    ],
  },
];

// <span className="data-title">
//   <span className="pink-text"> BEAUTIFUL </span>
//   <span className="smaller-title-text"> AND </span>
//   <span className="blue-text"> INTUITIVE </span>
//   <span className="smaller-title-text"> DATA </span>
// </span>

const LandingData = (props) => {
  return (
    <div id="landing-data" className="landing-section">
      <Plx className="landing-section-title" parallaxData={parallaxData}>
        <span className="data-title">
          <span className="data-title">
            <span className="pink-text"> BEAUTIFUL </span>
            <span className="smaller-title-text"> AND </span>
            <span className="blue-text"> INTUITIVE </span>
            <span className="smaller-title-text"> DATA </span>
          </span>
        </span>
      </Plx>
      <div className="landing-section-content">
        Our goal is to communicate data clearly and effectively.
        We designed our analytics with the focus on user experience.
        All for free.
      </div>
      <LandingExplosion />
    </div>
  );
};

export default LandingData;
