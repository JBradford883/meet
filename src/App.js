import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import EventGenre from './EventGenre';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import './nprogress.css';
import { Container, Row, Col } from 'react-bootstrap';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
          defaultCity: location
        });
      }
    });
  }

  updateEventsLength(inputValue) {
    const { defaultCity } = this.state;
    this.setState({
      numberOfEvents: inputValue
    });
    this.updateEvents(defaultCity, inputValue);
  }

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return { city, number };
    })
    return data;
  };

  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />
    const { locations, numberOfEvents, events } = this.state
    return (
      <Container className="App bg-dark">
        <WarningAlert text={this.state.warningText} />

        <Row>
          <Col>
            <h1 className="app-headline">Web Developer Events Near You</h1>
          </Col>
        </Row>

        <Row>
          <Col className="CitySearchWrapper mt-3">
            <CitySearch locations={locations} updateEvents={this.updateEvents} />
          </Col>
        </Row>

        <Row>
          <Col className="NumberOfEventsWrapper text-white" md={12}>
            <NumberOfEvents updateEventsLength={(value) => this.updateEventsLength(value)} numberOfEvents={numberOfEvents} />
          </Col>
        </Row>

        <Row>
          <Col>
            <div className="data-vis-wrapper" md={12}>
              <h4 className="data-vis-wrapper__headline">Events by genre</h4>
              <EventGenre events={events} />
              <h4 className="data-vis-wrapper__headline">Events in each city</h4>
              <ResponsiveContainer height={400} >
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid />
                  <XAxis
                    type="category"
                    dataKey="city"
                    name="city" />
                  <YAxis
                    allowDecimals={false}
                    type="number"
                    dataKey="number"
                    name="number of events"
                  />
                  <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                  <Scatter data={this.getData()} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="EventListWrapper">
            <EventList events={events} />
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