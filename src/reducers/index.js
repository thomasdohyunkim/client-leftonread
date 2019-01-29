import { combineReducers } from 'redux';
import MetricsReducer from './metrics_reducer';
import InstanceReducer from './instance_reducer';
import ErrorReducer from './error_reducer';
import FullDataReducer from './full_data_reducer';
import FilterReducer from './filter_reducer';
import AuthReducer from './auth_reducer';
import FeedbackReducer from './feedbackReducer';

const rootReducer = combineReducers({
  instance: InstanceReducer,
  metrics: MetricsReducer,
  error: ErrorReducer,
  fullData: FullDataReducer,
  filters: FilterReducer,
  auth: AuthReducer,
  feedback: FeedbackReducer,
});

export default rootReducer;
