import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { Container, Row, Col } from 'react-bootstrap';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    defaultCity: 'all',
    warningText: '',
    showWelcomeScreen: 'undefined'
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    this.setState({ showWelcomeScreen: !(code || isTokenValid) });

    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events)
          });
        }
        if (!navigator.onLine) {
          this.setState({ warningText: 'You are currently offline. Some of the apps features may be limited.' });
          console.log("App is offline");
        } else {
          this.setState({ warningText: '' });
        };
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
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

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    return (
      <Container className="App bg-dark">
        <WarningAlert text={this.state.warningText} />
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

        <Row>
          <Col>
            <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
          </Col>
        </Row>

      </Container>
    );
  }
}

export default App;