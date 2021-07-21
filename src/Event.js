import React, { Component } from "react";

class Event extends Component {

  state = {
    showDetails: false
  }

  render() {
    return (
      <div className="event-details">
        <button className="event-button"></button>
      </div>
    );
  }
}
export default Event;