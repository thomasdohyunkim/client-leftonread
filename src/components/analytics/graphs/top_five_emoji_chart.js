import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import GraphLoader from './graph_loader';
import ShareModal from '../overview/share/share_modal';

class TopFiveEmojisChart extends Component {
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
    const unfocusedOptions = {
      tooltips: {
        enabled: false,
      },
      scales: {
        xAxes: [{
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

    const focusedOptions = {
      tooltips: {
        enabled: true,
      },
      legend: {
        onClick: e => e.stopPropagation(),
      },
    };

    const chartData = {
      labels: this.props.data.labels.slice(this.state.startSplice, this.state.endSplice),
      datasets: [
        {
          backgroundColor: 'rgba(143,217,207, 0.4)', // sentiment blue
          borderColor: 'rgba(143,217,207, 1)',
          label: 'Top 5 Sent Emojis',
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
            <span data-tip data-for="info-TOP_FIVE_EMOJIS" className="share-icon-div">
              <i className="far fa-question-circle" />
            </span>
            <ReactTooltip id="info-TOP_FIVE_EMOJIS" effect="solid">
              {this.props.info}
            </ReactTooltip>
          </div>
          <div className="graph-component-header-actions">
            <ShareModal graphType="TOP_FIVE_EMOJIS" data={this.props.data} instanceKey={null} />
          </div>
        </div>
        <hr />
        <div className="graph-component">
          {this.state.startSplice >= 4 ?
            <button className="graph-button" onClick={this.scrollLeft}>
              <i className="fas fa-angle-left" />
            </button>
    : null }
          <HorizontalBar data={chartData} options={this.props.focused ? focusedOptions : unfocusedOptions} />
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

// { this.props.focused ?
//   <div className="flex-row">
//     <input value={this.state.wordFilter} placeholder="Search for a word" onChange={this.onWordFilterChange} />
//   </div>
//   :
//     null }

const mapStateToProps = state => ({
  data: state.metrics.TOP_FIVE_EMOJIS,
});

export default connect(mapStateToProps, null)(TopFiveEmojisChart);
