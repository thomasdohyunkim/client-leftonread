import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import TitleLogo from '../core/titleLogo';
import MilestoneDashboard from '../milestones/milestoneDashboard';
import OverviewTabs from '../analytics/overview/overview_tabs';

import { DEFAULT_METRICS, setExpectedMetrics, getMetrics } from '../../actions/metricActions';

import '../../styles/dashboard.scss';
import '../../styles/overview.scss';

const DISPLAY_MAP = {
  0: (<MilestoneDashboard />),
  1: (<OverviewTabs />),
};

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: 0,
    };

    this.changeDisplay = this.changeDisplay.bind(this);
    this.renderSidebarItems = this.renderSidebarItems.bind(this);
  }

  componentDidMount() {
    this.props.setExpectedMetrics(DEFAULT_METRICS);
    this.props.getMetrics(this.props.auth, DEFAULT_METRICS);
  }

  changeDisplay(e) {
    this.setState({
      display: parseInt(e.currentTarget.getAttribute('index'), 10),
    });
  }

  renderSidebarItems() {
    const sideBarText = ['Dashboard', 'Analytics', 'Previous Uploads'];

    const items = [];

    sideBarText.forEach((item, i) => {
      const highlightClass = this.state.display === i
        ? 'dashboard-sidebar-item dashboard-sidebar-selected'
        : 'dashboard-sidebar-item';

      items.push((
        <div className={highlightClass} onClick={this.changeDisplay} role="button" tabIndex={0} index={i} key={item}>
          <span name={i}> {item} </span>
        </div>
      ));
    });
    return items;
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-sidebar">
          <TitleLogo />
          <div className="dashboard-signed"> Welcome {this.props.auth.firstName}! </div>
          <div className="dashboard-signed">  <span className="link-animated"> Log out </span> </div>
          {this.renderSidebarItems()}
        </div>
        <div className="dashboard-content">
          {DISPLAY_MAP[this.state.display]}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => (
  {
    auth: state.auth,
  }
);

export default withRouter(connect(mapStateToProps, {
  setExpectedMetrics,
  getMetrics,
})(Dashboard));
