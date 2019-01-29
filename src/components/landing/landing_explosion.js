import React from 'react';
import Plx from 'react-plx';

const generateBoxParallaxMotion = () => {
  const ROWS = 4;
  const BOXES_PER_ROW = 4;
  const BOXES = [];
  const colors = ['#DEF8FF', '#FFF3F7', '#FD7EA3', '#DCEAB2'];

  // Generate parallax motion for each plot point
  for (let i = 0; i < ROWS; i += 1) {
    BOXES.push([]);
    for (let j = 0; j < BOXES_PER_ROW; j += 1) {
      const top = i < ROWS / 2;
      const yFactor = top ? -1 : 1;
      const left = j < BOXES_PER_ROW / 2;
      const xFactor = left ? -1 : 1;
      const inside = (i === 1 || i === 2) && (j === 1 || j === 2); // I was lazy to write generic formula
      const scaleFactor = inside ? 0.5 : 1;
      const start = inside ? 40 : 100;
      const offset = inside ? 40 : 100;
      const rotationFactor = Math.random() > 0.5 ? 180 : -180;
      const color = colors[j];

      BOXES[i].push({
        data: [
          {
            start: 'self',
            startOffset: '55vh',
            duration: 500,
            name: 'first',
            properties: [
              {
                startValue: 1,
                endValue: 0,
                property: 'opacity',
              },
              {
                startValue: 0,
                endValue: Math.random() * rotationFactor,
                property: 'rotate',
              },
              {
                startValue: 1,
                endValue: 1 + Math.random() * scaleFactor,
                property: 'scale',
              },
              {
                startValue: 0,
                endValue: (start + Math.random() * offset) * xFactor,
                property: 'translateX',
                unit: '%',
              },
              {
                startValue: 0,
                endValue: (start + Math.random() * offset) * yFactor,
                property: 'translateY',
                unit: '%',
              },
            ],
          },
        ],
        style: {
          backgroundColor: color,
        },
      });
    }
  }

  return BOXES;
};


const LandingExplosion = (props) => {
  const graphPlot =
  [
    [0, 0, 1, 0],
    [0, 1, 1, 0],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
  ];

  const motionData = generateBoxParallaxMotion();

  const renderColumnBoxes = (col) => {
    const boxes = [];
    for (let i = 0; i < graphPlot[col].length; i += 1) {
      if (graphPlot[i][col] == 1) {
        boxes.push(<Plx
          key={`${i} ${col}`}
          className="explosion-box"
          parallaxData={motionData[i][col].data}
          style={motionData[i][col].style}
        />);
      } else {
        boxes.push(<div className="explosion-box explosion-clear" key={`item${i}`} />);
      }
    }
    return boxes;
  };

  const renderColumn = (col) => {
    return (
      <div className="explosion-col" key={`col${col}`}>
        {renderColumnBoxes(col)}
      </div>
    );
  };

  const renderExplosion = () => {
    const columns = [];
    for (let i = 0; i < graphPlot[0].length; i += 1) {
      columns.push(renderColumn(i));
    }
    return (
      <div className="explosion-grid">
        { columns }
      </div>
    );
  };

  return (
    <div className="landing-explosion">
      { renderExplosion() }
    </div>
  );
};

export default LandingExplosion;
