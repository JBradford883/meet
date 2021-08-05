import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
  }

  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: 'red',
      width: '100vw',
      display: 'block',
      lineHeight: '25px',
      position: "fixed",
      top: '0',
      left: '0',
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'white';
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'white'
  }
}

export { InfoAlert, ErrorAlert };