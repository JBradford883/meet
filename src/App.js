import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import { Container, Row, Col } from 'react-bootstrap';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    defaultCity: 'all',
  }

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? events.slice(0, this.state.numberOfEvents) :
        events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, eventCount),
          defaultLocation: location
        });
      }
    });
  }

  updateEventsLength(inputValue) {
    this.setState({
      numberOfEvents: inputValue
    });
    const { defaultCity } = this.state
    this.updateEvents(defaultCity, inputValue);
  }

  componentDidMount() {
    const { numberOfEvents } = this.state;
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, numberOfEvents),
          locations: extractLocations(events)
        });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <Container className="App bg-dark">

        <Row className="mb-1 text-white">
          <Col>
            <p className="app-headline">Web Developer Events Near You</p>
          </Col>
        </Row>

        <Row>
          <Col className="CitySearchWrapper mt-3">
            <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
          </Col>
        </Row>

        <Row>
          <Col className="NumberOfEventsWrapper text-white" md={12}>
            <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEventsLength={(value) => this.updateEventsLength(value)} />
          </Col>
        </Row>

        <Row>
          <Col className="EventListWrapper">
            <EventList events={this.state.events} />
          </Col>
        </Row>

      </Container>
    );
  }
}

export default App;