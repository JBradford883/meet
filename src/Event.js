import React, { Component } from "react";
import { Card, Row, Col, Button } from 'react-bootstrap';
import moment from 'moment';

class Event extends Component {

  state = {
    showDetails: false
  }

  handleDetails = () => {
    if (this.state.showDetails === true) {
      this.setState({ showDetails: false });
    } else {
      this.setState({ showDetails: true });
    }
  };

  render() {
    const { event } = this.props;

    const eventStart = moment(event.start.dateTime).format('MMMM Do YYYY, h:mm a');

    return (

      <Row>
        <Col>
          <Card className="event m-3">
            <Card.Title className="event__Details">{event.summary}</Card.Title>
            <p className="event-start"><b>Start Time:</b> {`${eventStart}`}</p>
            <p className="event-start__timezone"><b>Time Zone:</b> {event.start.timeZone} </p>
            <p className="locations"><b>Location:</b> {event.location}</p>

            {
              this.state.showDetails && (
                <div className="show-event">
                  <h5><b>Event Details:</b></h5>
                  <p className="description">{event.description}</p>
                </div>
              )
            }
            <div className="event-button">
              <Button
                className='details-btn'
                variant="dark"
                onClick={() => this.handleDetails()}>
                {!this.state.showDetails ? 'Show Details' : 'Hide Details'}
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}
export default Event;

