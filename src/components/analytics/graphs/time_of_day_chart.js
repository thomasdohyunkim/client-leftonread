/* File: time_of_day_chart.js
 *
 * Author: Left On Read, May 2018 */

import React from 'react';
import { Line } from 'react-chartjs-2';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import GraphLoader from './graph_loader';
import ShareModal from '../overview/share/share_modal';

const TimeOfDayChart = (props) => {
  if (!props.data) {
    return (<GraphLoader />);
  } else if (props.data === 'error') {
    return <h1 className="graph-component-title"> No data found with this filter. Please enter a new one. </h1>;
  }

  const focusedOptions = {
    tooltips: {
      enabled: true,
    },
    scales: {
      yAxes: [{
        ticks: {
          min: 0,
        },
        stacked: false,
      }],
    },
    legend: {
      onClick: e => e.stopPropagation(),
    },
    maintainAspectRatio: false,

  };

  const chartData = {
    labels: props.data.labels,
    datasets: [
      {
        backgroundColor: 'rgba(143,217,207, 0.2)', // light blue
        label: 'Sent Texts',
        borderColor: [
          'rgba(143,217,207, 1)',
        ],
        borderWidth: 1,
        data: props.data.data[1],
      },
      {
        backgroundColor: 'rgba(255,174,198, 0.4)', // pink
        label: 'Received Texts',
        borderColor: [
          'rgba(255,174,198, 1)',
        ],
        borderWidth: 1,
        data: props.data.data[0],
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
          <span data-tip data-for="info-TIME_OF_DAY" className="share-icon-div">
            <i className="far fa-question-circle" />
          </span>
          <ReactTooltip id="info-TIME_OF_DAY" effect="solid">
            {props.info}
          </ReactTooltip>
        </div>
        <div className="graph-component-header-actions">
          <ShareModal graphType="TIME_OF_DAY" data={props.data} instanceKey={null} />
        </div>
      </div>
      <hr />
      <div className="graph-component">
        <Line data={chartData} options={focusedOptions} />
      </div>
    </div>
  );
};


const mapStateToProps = state => ({
  data: state.metrics.TIME_OF_DAY,
});

export default connect(mapStateToProps, null)(TimeOfDayChart);
