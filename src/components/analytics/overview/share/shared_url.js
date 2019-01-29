import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ReactGA from 'react-ga';
import { setExpectedMetrics, getMetrics, getSharePage } from '../../../../actions/index';
import graphWrapper from '../../graphs/graph_wrapper';
import { CHARTS } from '../overview_graphs';
import GraphLoader from '../../graphs/graph_loader';
import Footer from '../../../core/footer';
import Logo from '../../../core/logo';

class SharedUrl extends Component {
  constructor(props) {
    super(props);
    this.renderGraphComponents = this.renderGraphComponents.bind(this);
  }

  componentDidMount() {
    this.props.getSharePage(this.props.match.params.id);
  }

  renderGraphComponents() {
    // Ensure this.props.metrics exists to avoid error
    if (this.props.expectedMetrics) {
      const expected = this.props.expectedMetrics;

      // Iterate through each expected metric graph to appear
      const metric = expected;
      const GraphComponent = graphWrapper(CHARTS[metric]);
      console.log(metric);
      console.log(this.props);
      return <GraphComponent metric={metric} />;
    } else {
      return (<div> Loading </div>);
    }
  }

  render() {
    // for Google Analytics
    ReactGA.event({
      category: 'Share',
      action: 'a unique share url was rendered',
      label: 'view',
    });
    if (!this.props.data) {
      return (<GraphLoader />);
    }

    return (
      <div>
        <div className="sharedUrl">
          <NavLink className="home-button" to="/" exact>
            <Logo />
            <p className="overview-lor-title">Left On Read</p>
          </NavLink>
          {this.renderGraphComponents()}
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  expectedMetrics: state.metrics.expectedMetrics,
  data: state.metrics[state.metrics.expectedMetrics],
});

export default connect(mapStateToProps, { getSharePage, getMetrics, setExpectedMetrics })(SharedUrl);
