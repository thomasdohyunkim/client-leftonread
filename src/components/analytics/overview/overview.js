/* File: overview.js
 *
 * High level overview page.
 * Dispatches actions to retrieve data and populates
 * react-graph.js components in the analytics section.
 *
 * Author: Left On Read, May 2018 */

/* eslint class-methods-use-this: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import ReactGA from 'react-ga';
import ReactTooltip from 'react-tooltip';
import Collapsible from 'react-collapsible';
import 'react-datepicker/dist/react-datepicker.css';
import 'rodal/lib/rodal.css';
import Footer from '../../core/footer';
import Logo from '../../core/logo';

import { applyFilter } from '../../../actions/index';
import { DEFAULT_METRICS, FILTERED_METRICS, setExpectedMetrics, getMetrics } from '../../../actions/metricActions';
import FilterBar from './filter_bar';

// import OverviewGraphs from './overview_graphs';
import OverviewTabs from './overview_tabs';
import '../../../styles/overview.scss';


class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false,
    };

    this.onFilterChange = this.onFilterChange.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
  }

  // COMMENT OUT IF DEBUGGING STYLING
  componentDidMount() {
    // Check if authorized in instance
    // if (!this.props.instanceKey) {
    //   ReactGA.event({
    //     category: 'Error',
    //     action: 'no instance error shown',
    //   });
    //   toast.error('No instance associated with this session.');
    //   this.props.history.push('/starter');
    // }

    // On first load, should show default metrics
    this.props.setExpectedMetrics(DEFAULT_METRICS);
    this.props.getMetrics(this.props.auth, DEFAULT_METRICS);
  }

  onFilterChange() {
    if (this.props.filters.display !== '' || this.props.filters.startDate !== '' || this.props.filters.endDate !== '') {
      this.props.setExpectedMetrics(FILTERED_METRICS);
      this.props.applyFilter(this.props.instanceKey, FILTERED_METRICS, this.props.filters.display, this.props.filters.startDate, this.props.filters.endDate);
    } else {
      this.props.setExpectedMetrics(DEFAULT_METRICS);
      this.props.getMetrics(this.props.instanceKey, DEFAULT_METRICS);
    }
  }

  toggleFilter() {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  }

  render() {
    return (
      <div>
        <div className="overview">
          <div className="overview-main">
            <div className="overview-toolbar">
              <div>
                <Logo />
              </div>
              <div>
                <p className="overview-instance">
                  <span data-tip="Use this unique key to login and reaccess your graphs. It expires in 48 hours.">
                    <i className="far fa-question-circle"
                      aria-hidden="true"
                    />
                  </span>
                  &nbsp; Instance Key: &nbsp;<span>{this.props.instanceKey}</span>
                  {/* <h2 className="overview-user-title"> {'Alex\'s texting'}</h2> */}
                </p>
                <ReactTooltip className="overview-tooltip" effect="solid" />
              </div>
              <div className="filterBar">
                <Collapsible trigger="Filter" easing="ease-in-out" transitionTime={300}>
                  <FilterBar onFilterChange={this.onFilterChange} />
                </Collapsible>
              </div>
            </div>
            <div className="overview-tabs">
              <OverviewTabs />
            </div>
          </div>
        </div>
        <div>
          <Footer />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // instanceKey: 'yourinstancekey',
  auth: state.auth,
  instanceKey: state.instance.key,
  expectedMetrics: state.metrics.expectedMetrics, // list of graph styles
  filters: state.filters,
});

export default connect(mapStateToProps, { setExpectedMetrics, getMetrics, applyFilter })(Overview);
