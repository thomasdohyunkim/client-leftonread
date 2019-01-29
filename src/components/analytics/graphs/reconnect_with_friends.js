import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HorizontalBar } from 'react-chartjs-2';
import ReactTooltip from 'react-tooltip';
import GraphLoader from './graph_loader';
import ShareModal from '../overview/share/share_modal';

class ReconnectWithFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startSplice: 0,
      endSplice: 5,
    };

    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
  }

  scrollLeft() {
    this.setState({
      startSplice: this.state.startSplice - 4,
      endSplice: this.state.endSplice - 4,
    });
  }

  scrollRight() {
    this.setState({
      startSplice: this.state.startSplice + 4,
      endSplice: this.state.endSplice + 4,
    });
  }

  render() {
    if (!this.props.data) {
      return (<GraphLoader />);
    } else if (this.props.data === 'error') {
      return <h1 className="graph-component-title"> No data found with this filter. Please enter a new one. </h1>;
    }

    const focusedOptions = {
      tooltips: {
        enabled: true,
        // percentage conversion function taken from https://stackoverflow.com/questions/37257034/chart-js-2-0-doughnut-tooltip-percentages
        callbacks: {
          label(tooltipItem, data) {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const currentValue = dataset.data[tooltipItem.index];
            const numTexts = Math.floor(currentValue);
            return `${numTexts}`;
          },
        },
      },
      legend: {
        onClick: e => e.stopPropagation(),
      },
      scales: {
        xAxes: [{
          display: true,
          stacked: true,
        }],
      },
    };

    const chartData = {
      labels: this.props.data.labels[0].slice(this.state.startSplice, this.state.endSplice),
      datasets: [
        {
          label: 'Number of texts with love sentiment',
          backgroundColor: 'rgba(252, 211, 222, 0.6)',
          borderColor: '#FCD3DE',
          borderWidth: 1,
          data: this.props.data.data[0].slice(this.state.startSplice, this.state.endSplice),
        },
      ],
    };

    return (
      <div className="graph-component-wrapper">
        <div className="graph-component-header">
          <div className="graph-component-header-title">
            { this.props.data.title }
            &nbsp;
            &nbsp;
            <span data-tip data-for="info-RECONNECT" className="share-icon-div">
              <i className="far fa-question-circle" />
            </span>
            <ReactTooltip id="info-RECONNECT" effect="solid">
              {this.props.info}
            </ReactTooltip>
          </div>
          <div className="graph-component-header-actions">
            <ShareModal graphType="RECONNECT" data={this.props.data} instanceKey={null} />
          </div>
        </div>
        <hr />
        <div className="graph-component">
          {this.state.startSplice >= 4 ?
            <button className="graph-button" onClick={this.scrollLeft}>
              <i className="fas fa-angle-left" />
            </button>
    : null }
          <HorizontalBar data={chartData} options={focusedOptions} />
          {this.state.startSplice < this.props.data.data[0].length ?
            <button className="graph-button" onClick={this.scrollRight}>
              <i className="fas fa-angle-right" />
            </button>
    : null }
        </div>
      </div>
    );
  }
}


const mapStateToProps = state => ({
  data: state.metrics.RECONNECT,
});

export default connect(mapStateToProps, null)(ReconnectWithFriends);
