import React, { Component } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import graphWrapper from '../graphs/graph_wrapper';
import TotalTextChart from '../graphs/total_text_chart';
import TextsPerDayChart from '../graphs/texts_per_day_chart';
import TopFiveFriendsChart from '../graphs/top_five_friends_chart';
import TopFiveWordsChart from '../graphs/top_five_words_chart';
import SentimentChart from '../graphs/sentiment_chart';
import SentimentTimeChart from '../graphs/sentiment_time';
import AvgLengthChart from '../graphs/avg_length';
import TopFiveEmojisChart from '../graphs/top_five_emoji_chart';
import ReconnectWithFriends from '../graphs/reconnect_with_friends';
import TimeOfDay from '../graphs/time_of_day_chart';

import '../../../styles/tabs.scss';

import { MetricTypes } from '../../../actions/metricActions';
import { submitFeedback } from '../../../actions/feedbackActions';

// Static mapping from data to chart component
const CHARTS = {
  TOTAL_TEXTS: TotalTextChart,
  TEXTS_PER_DAY: TextsPerDayChart,
  TOP_FIVE_FRIENDS: TopFiveFriendsChart,
  TOP_FIVE_WORDS: TopFiveWordsChart,
  TOP_FIVE_EMOJIS: TopFiveEmojisChart,
  SENTIMENTS: SentimentChart,
  RECONNECT: ReconnectWithFriends,
  SENTIMENT_TIME: SentimentTimeChart,
  AVG_LENGTH: AvgLengthChart,
  TIME_OF_DAY: TimeOfDay,
};

const BIG_METRICS = [
  MetricTypes.TEXTS_PER_DAY,
  MetricTypes.SENTIMENT_TIME,
  MetricTypes.TIME_OF_DAY,
];

const METRIC_TYPE_MAP = {
  Overview: [MetricTypes.TEXTS_PER_DAY, MetricTypes.TOTAL_TEXTS, MetricTypes.TOP_FIVE_FRIENDS],
  Sentiment: [MetricTypes.SENTIMENT_TIME, MetricTypes.SENTIMENTS, MetricTypes.RECONNECT],
  Words: [MetricTypes.TOP_FIVE_WORDS, MetricTypes.TOP_FIVE_EMOJIS],
  Habits: [MetricTypes.TIME_OF_DAY, MetricTypes.AVG_LENGTH],
  // People: [MetricTypes.TOP_FIVE_FRIENDS, MetricTypes.RECONNECT],
};

const renderGraphs = (metrics) => {
  const graphComponents = [];

  // Iterate through each expected metric graph to appear
  for (let i = 0; i < metrics.length; i += 1) {
    const metric = metrics[i];
    const GraphComponent = graphWrapper(CHARTS[metric]);
    if (BIG_METRICS.includes(metric)) {
      graphComponents.push(<GraphComponent key={i} metric={metric} big />);
    } else {
      graphComponents.push(<GraphComponent key={i} metric={metric} />);
    }
  }
  return (
    <div className="overview-graphs">
      {graphComponents}
    </div>
  );
};

class OverviewTabs extends Component {
  componentWillUnmount() {
    this.props.submitFeedback('some feedback');
  }

  render() {
    const tabs = [];
    const tabPanels = [];
    for (const key in METRIC_TYPE_MAP) {
      if (Object.prototype.hasOwnProperty.call(METRIC_TYPE_MAP, key)) {
        tabs.push(<Tab key={`tab_${key}`}> {key} </Tab>);
        tabPanels.push(<TabPanel key={`tab_${key}`}> {renderGraphs(METRIC_TYPE_MAP[key])} </TabPanel>);
      }
    }

    return (
      <Tabs defaultIndex={0}>
        <TabList>
          {tabs}
        </TabList>
        {tabPanels}
      </Tabs>
    );
  }
}

export default withRouter(connect(null, {
  submitFeedback,
})(OverviewTabs));
