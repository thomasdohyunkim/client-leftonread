import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import GraphLoader from './graph_loader';
import ShareModal from '../overview/share/share_modal';

class TopFiveFriendsChart extends Component {
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
          backgroundColor: 'rgba(143,217,207, 0.6)', // blue
          borderColor: 'rgba(143,217,207, 1)', // blue
          borderWidth: 1,
          label: 'Sent Texts',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: this.props.data.data[1].slice(this.state.startSplice, this.state.endSplice),
        },
        {
          backgroundColor: 'rgba(255,174,198, 0.6)', // pink
          borderColor: 'rgba(255,174,198, 1)', // pink
          borderWidth: 1,
          label: 'Received Texts',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
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
            <span data-tip data-for="info-TOP_FIVE_FRIENDS" className="share-icon-div">
              <i className="far fa-question-circle" />
            </span>
            <ReactTooltip id="info-TOP_FIVE_FRIENDS" effect="solid">
              {this.props.info}
            </ReactTooltip>
          </div>
          <div className="graph-component-header-actions">
            <ShareModal graphType="TOP_FIVE_FRIENDS" data={this.props.data} instanceKey={null} />
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


const mapStateToProps = state => ({
  data: state.metrics.TOP_FIVE_FRIENDS,
});

export default connect(mapStateToProps, null)(TopFiveFriendsChart);
