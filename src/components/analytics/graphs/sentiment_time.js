/* File: texts_per_day_chart.js
 *
 * Author: Left On Read, May 2018 */

import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import GraphLoader from './graph_loader';
import ShareModal from '../overview/share/share_modal';

const SentimentTimeChart = (props) => {
  if (!props.data) {
    return (<GraphLoader />);
  } else if (props.data === 'error') {
    return <h1 className="graph-component-title"> No data found with this filter. Please enter a new one. </h1>;
  }

  const unfocusedOptions = {
    tooltips: {
      enabled: false,
    },
    scales: {
      xAxes: [{
        display: false,
      }],
      yAxes: [{
        stacked: true,
      }],
    },
    legend: {
      onClick: e => e.stopPropagation(),
    },
    maintainAspectRatio: false,
  };

  const focusedOptions = {
    tooltips: {
      enabled: true,
      // percentage conversion function taken from https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages
      callbacks: {
        label(tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const currentValue = dataset.data[tooltipItem.index];
          //          const numTexts = Math.floor(currentValue);

          const numTexts = parseFloat(Math.round(currentValue * 100) / 100).toFixed(2) * 100;
          return `${numTexts}%`;
        },
      },
    },
    legend: {
      onClick: e => e.stopPropagation(),
    },
    maintainAspectRatio: false,

  };

  const dateLabels = props.data.labels.map((date) => {
    const d = new Date(date);
    const month = d.getMonth() + 1;
    const day = d.getDate() + 1;
    const year = d.getYear() + 1900;

    return `${month}/${day}/${year}`;
  });

  const dataSampling = (data) => {
    const newArr = data.filter((value, index, Arr) => {
      return index % 10 == 0;
    });
    return newArr;
  };

  const chartData = {
    labels: dataSampling(dateLabels),
    datasets: [
      {
        backgroundColor: 'rgba(252, 211, 222, 0.2)',
        label: 'Love',
        borderColor: '#FFAEC6',
        borderWidth: 1,
        data: dataSampling(props.data.data[0]),
      },
      {
        backgroundColor: 'rgba(254, 209, 140, 0.2)',
        label: 'Happy',
        borderColor: '#FFFC88',
        borderWidth: 1,
        data: dataSampling(props.data.data[1]),
      },
      {
        backgroundColor: 'rgba(254, 95, 85, 0.2)',
        label: 'Anger',
        borderColor: '#FF7177',
        borderWidth: 1,
        data: dataSampling(props.data.data[2]),
      },
      {
        backgroundColor: 'rgba(123, 224, 173, 0.2)',
        label: 'Stress',
        borderColor: '#8FD9CF',
        borderWidth: 1,
        data: dataSampling(props.data.data[3]),
      },
      {
        backgroundColor: 'rgba(51, 153, 255, 0.2)',
        label: 'Social',
        borderColor: '#C5FEFF',
        borderWidth: 1,
        data: dataSampling(props.data.data[4]),
      },
    ],
  };

  return (
    <div className="graph-component-wrapper">
      <div className="graph-component-header">
        <div className="graph-component-header-title">
          { props.data.title }
          &nbsp;
          &nbsp;
          <span data-tip data-for="info-SENTIMENT_TIME" className="share-icon-div">
            <i className="far fa-question-circle" />
          </span>
          <ReactTooltip id="info-SENTIMENT_TIME" effect="solid">
            {props.info}
          </ReactTooltip>
        </div>
        <div className="graph-component-header-actions">
          <ShareModal graphType="SENTIMENT_TIME" data={props.data} instanceKey={null} />
        </div>
      </div>
      <hr />
      <div className="graph-component">
        <Line data={chartData} options={props.focused ? focusedOptions : unfocusedOptions} />
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  data: state.metrics.SENTIMENT_TIME,
});

export default connect(mapStateToProps, null)(SentimentTimeChart);
