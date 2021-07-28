import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    numberOfEvents: 32,
    // errorText: ''
  }

  handleInputChanged = (e) => {
    const value = e.target.value;
    if (value < 1) {
      return this.setState({
        numberOfEvents: '',
        // errorText: 'Enter a number between 1 and 32'
      });
    } else if (value > 32) {
      this.setState({
        numberOfEvents: '',
        // errorText: 'Enter a number between 1 and 32'
      });
    } else {
      this.setState({
        numberOfEvents: value,
        // errorText: ''
      })
      this.props.updateEventsLength(value)
    }
  };

  // resetInput = (e) => {
  //   e.target.value = '';
  // }

  render() {

    return (
      <div className="numberOfEvents">
        <label className="events-input">Number of Events</label>
        <input
          type="number"
          className="numberInput"
          placeholder="Enter Number of Events"
          value={this.state.numberOfEvents}
          onChange={(e) => this.handleInputChanged(e)}
        // onFocus={(e) => this.resetInput(e)}
        />
      </div>
    )
  }
}

export default NumberOfEvents