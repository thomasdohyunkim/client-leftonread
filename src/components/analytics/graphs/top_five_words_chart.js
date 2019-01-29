/* File: top_five_words_chart.js
 *
 * Author: Left On Read, May 2018 */

/* eslint jsx-a11y/no-static-element-interactions:0 */

import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import debounce from 'lodash.debounce';

import GraphLoader from './graph_loader';
import ShareModal from '../overview/share/share_modal';
import { wordFilter } from '../../../actions/index';


class TopFiveWordsChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wordFilter: '',
      startSplice: 0,
      endSplice: 5,
    };

    this.onWordFilterChange = this.onWordFilterChange.bind(this);
    this.submitFilter = this.submitFilter.bind(this);
    this.submitFilter = debounce(this.submitFilter, 700);
    this.scrollRight = this.scrollRight.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
  }

  onWordFilterChange(event) {
    this.setState({
      wordFilter: event.target.value,
      startSplice: 0,
      endSplice: 5,
    });
    this.submitFilter();
  }

  onShareClick(event) {
    event.preventDefault();
    this.handleOpenModal();
    this.props.createSharePage('TOP_FIVE_WORDS', this.props.data, this.props.instanceKey);
  }

  submitFilter() {
    this.props.wordFilter(this.state.wordFilter, this.props.instanceKey, this.props.filters);
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
      return (<h1 className="graph-component-title"> No data found with this filter. Please enter a new one. </h1>);
    } else {
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
            backgroundColor: 'rgba(255,174,198, 0.3)', // pink
            borderColor: 'rgba(255,174,198, 1)',
            borderWidth: 1,
            label: 'Word Count from Your Sent Texts',
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
              <span data-tip data-for="info-TOP_FIVE_WORDS" className="share-icon-div">
                <i className="far fa-question-circle" />
              </span>
              <ReactTooltip id="info-TOP_FIVE_WORDS" effect="solid">
                {this.props.info}
              </ReactTooltip>
            </div>
            <div className="graph-component-header-actions">
              <ShareModal graphType="TOP_FIVE_WORDS" data={this.props.data} instanceKey={null} />
            </div>
          </div>
          <hr />
          { this.props.focused ?
            <div className="flex-row" onClick={e => e.stopPropagation()}>
              <input value={this.state.wordFilter} placeholder="Search for a word" onChange={this.onWordFilterChange} />
            </div>
            :
              null }
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
}

const mapStateToProps = state => ({
  data: state.metrics.TOP_FIVE_WORDS,
  instanceKey: state.instance.key,
  filters: state.filters,
});

export default connect(mapStateToProps, { wordFilter })(TopFiveWordsChart);
