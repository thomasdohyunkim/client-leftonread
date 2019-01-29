import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import GraphLoader from './graph_loader';
import ShareModal from '../overview/share/share_modal';

const AvgLengthChart = (props) => {
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
      xAxes: [{
        ticks: {
          beginAtZero: true,
        },
        stacked: true,
      }],
      yAxes: [{
        stacked: true,
      }],
    },
    legend: {
      onClick: e => e.stopPropagation(),
    },
  };

  const chartData = {
    labels: props.data.labels,
    datasets: [
      {
        backgroundColor: 'rgba(255,252,136, 0.6)', // yellow
        borderColor: 'rgba(255,252,136, 1)',
        borderWidth: 1,
        label: 'Number of characters',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: [props.data.data[0], props.data.data[1]],
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
          <span data-tip data-for="info-AVG_LENGTH" className="share-icon-div">
            <i className="far fa-question-circle" />
          </span>
          <ReactTooltip id="info-AVG_LENGTH" effect="solid">
            {props.info}
          </ReactTooltip>
        </div>
        <div className="graph-component-header-actions">
          <ShareModal graphType="AVG_LENGTH" data={props.data} instanceKey={null} />
        </div>
      </div>
      <hr />
      <div className="graph-component">
        <HorizontalBar data={chartData} options={focusedOptions} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.metrics.AVG_LENGTH,
});

export default connect(mapStateToProps, null)(AvgLengthChart);
