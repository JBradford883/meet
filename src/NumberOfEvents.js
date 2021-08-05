import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

  state = {
    numberOfEvents: 32,
    errorText: ''
  }

  handleInputChanged = (e) => {
    const value = e.target.value;
    if (value <= 0 || value > 32) {
      return this.setState({
        numberOfEvents: '',
        errorText: 'Please enter a number between 1 and 32'
      });
    } else {
      this.setState({
        numberOfEvents: value,
        errorText: ''
      })
      this.props.updateEventsLength(value)
    }
  };

  resetInput = (e) => {
    e.target.value = '';
  }

  render() {

    return (
      <div className="numberOfEvents">
        <label className="events-input">Number of Events Displayed</label>
        <input
          type="number"
          className="numberInput"
          placeholder="Enter Number of Events"
          value={this.state.numberOfEvents}
          onChange={(e) => this.handleInputChanged(e)}
          onFocus={(e) => this.resetInput(e)}
        />
        <b><ErrorAlert text={this.state.errorText} /></b>
      </div>
    )
  }
}

export default NumberOfEvents