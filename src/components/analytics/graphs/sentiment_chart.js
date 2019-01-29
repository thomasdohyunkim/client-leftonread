import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import GraphLoader from './graph_loader';
import ShareModal from '../overview/share/share_modal';

const SentimentChart = (props) => {
  if (!props.data) {
    return (<GraphLoader />);
  } else if (props.data === 'error') {
    return <h1 className="graph-component-title"> No data found with this filter. Please enter a new one. </h1>;
  }

  const unfocusedOptions = {
    tooltips: {
      enabled: false,
    },
    legend: {
      onClick: e => e.stopPropagation(),
    },
  };

  const focusedOptions = {
    tooltips: {
      enabled: true,
      // percentage conversion function taken from https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages
      callbacks: {
        label(tooltipItem, data) {
          const dataset = data.datasets[tooltipItem.datasetIndex];
          const total = dataset.data.reduce((previousValue, currentValue, currentIndex, array) => {
            return previousValue + currentValue;
          });
          const currentValue = dataset.data[tooltipItem.index];
          const precentage = Math.floor(((currentValue / total) * 100) + 0.5);
          return `${precentage}%`;
        },
      },
    },
    legend: {
      onClick: e => e.stopPropagation(),
    },
  };

  const {
    love, happy, anger, stress, social,
  } = props.data.data;

  const chartData = {
    labels: props.data.labels,
    datasets: [
      {
        // Order: Love, Happy, Anger, Stress, Social
        backgroundColor: ['#FFAEC6', '#FFFC88', '#FF7177', '#8FD9CF', '#C5FEFF'],
        label: 'iMessage Data Set',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [love, happy, anger, stress, social],
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
          <span data-tip data-for="info-SENTIMENTS" className="share-icon-div">
            <i className="far fa-question-circle" />
          </span>
          <ReactTooltip id="info-SENTIMENTS" effect="solid">
            {props.info}
          </ReactTooltip>
        </div>
        <div className="graph-component-header-actions">
          <ShareModal graphType="SENTIMENTS" data={props.data} instanceKey={null} />
        </div>
      </div>
      <hr />
      <div className="graph-component">
        <Doughnut data={chartData} options={props.focused ? focusedOptions : unfocusedOptions} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.metrics.SENTIMENTS,
});

export default connect(mapStateToProps, null)(SentimentChart);
