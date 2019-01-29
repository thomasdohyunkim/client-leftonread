import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Select from 'react-select';
import ReactGA from 'react-ga';
import 'react-select/dist/react-select.css';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllNumbers, applyFilter, MetricTypes, setExpectedMetrics, getMetrics, updateFilter } from '../../../actions/index';

/* eslint max-len: 0 */

class FilterBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: {
        label: 'All',
        value: 'All',
      },
      allDates: true,
      startDate: null,
      endDate: null,
    };

    this.onConvoSelect = this.onConvoSelect.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleDatesBoxChange = this.handleDatesBoxChange.bind(this);
  }

  componentDidMount() {
    this.props.getAllNumbers(this.props.instanceKey);
  }

  onConvoSelect(option) {
    this.setState({ selected: option });
  }

  onStartDateChange(date) {
    this.setState({ startDate: date });
  }

  onEndDateChange(date) {
    this.setState({ endDate: date });
  }

  onSubmit(event) {
    // for Google Analytics
    ReactGA.event({
      category: 'Filter',
      action: 'filter button was submitted',
      label: 'interaction',
    });
    let start = this.state.startDate;
    let end = this.state.endDate;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (start !== null && end !== null && start > end) {
      toast.error('Make sure the start date is earlier than the end date');
      return;
    } else if (start > today) {
      toast.error('Make sure the start date is before the current date');
      return;
    }
    let num = this.state.selected.value;
    if (!this.state.allDates) {
      if (start === null) {
        start = '';
      } else {
        start = start.format('YYYY-MM-DD');
      }
      if (end === null) {
        end = '';
      } else {
        end = end.format('YYYY-MM-DD');
      }
    } else {
      start = '';
      end = '';
    }
    if (num === 'All') {
      num = '';
    }

    this.props.applyFilter(this.props.instanceKey, num, start, end);
    event.preventDefault();
  }

  handleDatesBoxChange() {
    this.setState({ allDates: true, startDate: null, endDate: null });
  }

  renderAllDate() {
    if (this.state.allDates) {
      return (
        <div className="all-dates-true">
          <label htmlFor="dates-checkbox-true">
            <input id="dates-checkbox-true" name="allDates" type="checkbox" checked={this.state.allDates} onChange={this.handleDatesBoxChange} />
            All Dates
          </label>
        </div>
      );
    } else {
      return (
        <div className="all-dates-false">
          <label htmlFor="dates-checkbox-false">
            <input id="dates-checkbox-false" name="allDates" type="checkbox" checked={this.state.allDates} onChange={this.handleDatesBoxChange} />
                  All Dates
          </label>
        </div>
      );
    }
  }

  renderDateBoxes() {
    if (!this.state.allDates) {
      return (
        <div className="selection-dates">
          <div className="date-clicker" onClick={() => { this.setState({ allDates: false }); }} role="button" tabIndex={-1}>
            <DatePicker
              placeholderText="Start date"
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={(date) => { this.onStartDateChange(date); }}
              popperPlacement="auto"
              popperModifiers={{
                flip: {
                  enabled: false,
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                  boundariesElement: 'viewport',
                },
              }}
            />
          </div>
          <div className="date-clicker" onClick={() => { this.setState({ allDates: false }); }} role="button" tabIndex={-1}>
            <DatePicker
              placeholderText="End date"
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onChange={(date) => { this.onEndDateChange(date); }}
              popperPlacement="auto"
              popperModifiers={{
                flip: {
                  enabled: false,
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false, // force popper to stay in viewport (even when input is scrolled out of view)
                  boundariesElement: 'viewport',
                },
              }}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="all-dates">
          <div className="date-clicker" onClick={() => { this.setState({ allDates: false }); }} role="button" tabIndex={-1}>
            <DatePicker
              placeholderText="Start date"
              selected={this.state.startDate}
              onChange={(date) => { this.setState({ allDates: false }); this.onStartDateChange(date); }}
            />
          </div>
          <div className="date-clicker" onClick={() => { this.setState({ allDates: false }); }} role="button" tabIndex={-1}>
            <DatePicker
              placeholderText="End date"
              selected={this.state.endDate}
              onChange={(date) => { this.setState({ allDates: false }); this.onEndDateChange(date); }}
            />
          </div>
        </div>
      );
    }
  }

  render() {
    const defaultOption = this.state.selected;
    const optionsArr = ['All'].concat(this.props.numbers);
    const options = optionsArr.map((option) => {
      return {
        value: option,
        label: option,
      };
    });
    return (
      <div className="filter-bar">
        <div className="filter-section">
          <p>Conversation</p>
          <div className="select-bar">
            <Select
              name="conversation"
              value={defaultOption}
              onChange={this.onConvoSelect}
              options={options}
              clearable={false}
            />
          </div>
        </div>
        <div className="filter-section">
          <p>Dates</p>
          {this.renderAllDate()}
          {this.renderDateBoxes()}

        </div>
        <button className="button" onClick={this.onSubmit}>
        Update
        </button>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  instanceKey: state.instance.key,
  numbers: state.fullData.numbers,
});

export default connect(mapStateToProps, {
  getAllNumbers, applyFilter, MetricTypes, setExpectedMetrics, getMetrics, updateFilter,
})(FilterBar);
