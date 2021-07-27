import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './api';
import './nprogress.css';
import { Container } from 'react-bootstrap';

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
      <Container className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} updateEventsLength={(value) => this.updateEventsLength(value)} />
        <EventList events={this.state.events} />
      </Container>
    );
  }
}

export default App;