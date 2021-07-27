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

      <Row className="justify-content-md-center ">
        <Col className="mr-2">
          <Card className="event border border-secondary rounded">
            <Card.Title className="name">{event.summary}</Card.Title>
            <p className="eventStart">{`${eventStart}`} / {event.start.timeZone} </p>
            <p className="locations">@ {event.summary}</p>
            <p className="locations">{event.location}</p>

            {
              this.state.showDetails && (
                <div className="showEvent">
                  <h5>About event:</h5>
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


// const { event } = this.props;
//     return (
//       <div className="event-details">
//         <h1 className="name">{event.summary}</h1>
//         <p>{event.start.dateTime}</p>
//         <p className="location">{event.location}</p>
//         {this.state.showHideDetails && (
//           <div className='event-details'>
//             <h2>About event:</h2>
//             <p>{event.description}</p>
//           </div>
//         )}

//         <button
//           className='event-button'
//           onClick={() => this.handleShowHideButton()}>
//           {!this.state.showHideDetails ? 'Show Details' : 'Hide Details'}
//         </button>
//       </div>
//     );
//   }
// }