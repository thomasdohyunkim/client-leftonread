import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, withRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// from https://github.com/sonaye/react-with-analytics
import withAnalytics, { initAnalytics } from 'react-with-analytics';

import '../styles/ReactToastify.css';

import requireAuth from './core/requireAuth';
import ScrollToTop from './core/scroll_to_top';
import Landing from './landing/landing2';
import Starter from './instance/starter';
import KeyReturn from './instance/key_return';
import Overview from './analytics/overview/overview';
import iMessageWidget from './instance/imessage_widget';
import Loader from './instance/loader';
import PrivacyPolicy from './static/privacy_policy';
import Blog from './static/blog';
import SharedUrl from './analytics/overview/share/shared_url';
import SignUpPage from './users/signUpPage';
import LoginPage from './users/signInPage';
import ProfilePage from './users/profilePage';
import Dashboard from './dashboard/dashboard';

initAnalytics('UA-113056721-2');

const Root = (props) => {
  return (
    <ScrollToTop>
      <div className="all-container">
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/starter" component={Starter} />
          <Route exact path="/overview" component={Overview} />
          <Route exact path="/message" component={iMessageWidget} />
          <Route exact path="/return" component={KeyReturn} />
          <Route exact path="/loader" component={Loader} />
          <Route exact path="/sharedUrl/:id" component={SharedUrl} />
          <Route exact path="/privacypolicy" component={PrivacyPolicy} />
          <Route exact path="/blog" component={Blog} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/profile" component={requireAuth(ProfilePage)} />
          <Route exact path="/dashboard" component={requireAuth(Dashboard)} />
          <Route render={Landing} />
        </Switch>
        <ToastContainer
          position="top-right"
          pauseOnHover={false}
          autoClose={4000}
        />
      </div>
    </ScrollToTop>

  );
};

const App = withRouter(withAnalytics(Root));

const AppWithRouter = () => (
  <Router>
    <App />
  </Router>
);

const mapStateToProps = state => ({
  error: state.error,
});

export default connect(mapStateToProps, null)(AppWithRouter);
