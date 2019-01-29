import React from 'react';
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
import TimeOfDayChart from '../graphs/time_of_day_chart';

import { MetricTypes } from '../../../actions/metricActions';


// Static mapping from data to chart component
export const CHARTS = {
  TIME_OF_DAY: TimeOfDayChart,
  TOTAL_TEXTS: TotalTextChart,
  TEXTS_PER_DAY: TextsPerDayChart,
  TOP_FIVE_FRIENDS: TopFiveFriendsChart,
  TOP_FIVE_WORDS: TopFiveWordsChart,
  TOP_FIVE_EMOJIS: TopFiveEmojisChart,
  SENTIMENTS: SentimentChart,
  RECONNECT: ReconnectWithFriends,
  SENTIMENT_TIME: SentimentTimeChart,
  AVG_LENGTH: AvgLengthChart,
};

const BIG_METRICS = [
  MetricTypes.TEXTS_PER_DAY,
  MetricTypes.SENTIMENT_TIME,
];

const OverviewGraphs = (props) => {
  if (props.displayedMetrics && props.expectedMetrics) {
    const displayed = props.displayedMetrics;
    const graphComponents = [];

    // Iterate through each expected metric graph to appear
    for (let i = 0; i < displayed.length; i += 1) {
      const metric = displayed[i];
      if (props.expectedMetrics.includes(metric)) {
        const GraphComponent = graphWrapper(CHARTS[metric]);
        if (BIG_METRICS.includes(metric)) {
          graphComponents.push(<GraphComponent key={i} big />);
        } else {
          graphComponents.push(<GraphComponent key={i} metric={metric} />);
        }
      }
    }
    return (
      <div className="overview-graphs">
        {graphComponents}
      </div>
    );
  } else {
    return (<div> No graphs to display </div>);
  }
};

export default OverviewGraphs;
