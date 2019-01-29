import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import GraphLoader from './graph_loader';
import ShareModal from '../overview/share/share_modal';

const TotalTextChart = (props) => {
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
    },
    legend: {
      onClick: e => e.stopPropagation(),
    },
  };

  const chartData = {
    labels: props.data.labels,
    datasets: [
      {
        backgroundColor: ['#8FD9CF', '#FFAEC6'], // orange, and gray
        label: 'iMessage Data Set',
        fillColor: 'rgba(220,220,220,0.2)',
        strokeColor: 'rgba(220,220,220,1)',
        pointColor: 'rgba(220,220,220,1)',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: 'rgba(220,220,220,1)',
        data: props.data.data,
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
          <span data-tip data-for="info-TOTAL_TEXTS" className="share-icon-div">
            <i className="far fa-question-circle" />
          </span>
          <ReactTooltip id="info-TOTAL_TEXTS" effect="solid">
            {props.info}
          </ReactTooltip>
        </div>
        <div className="graph-component-header-actions">
          <ShareModal graphType="TOTAL_TEXTS" data={props.data} instanceKey={null} />
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
  data: state.metrics.TOTAL_TEXTS,
});

export default connect(mapStateToProps, null)(TotalTextChart);
