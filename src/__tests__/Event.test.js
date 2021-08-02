import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]} />);
  });

  test('renders a list of details', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });

  // Renders a show details button for the events
  test('render show more button for the event', () => {
    expect(EventWrapper.find('.event-button')).toHaveLength(1);
  });

  test('renders event title', () => {
    expect(EventWrapper.find('.event__Details')).toHaveLength(1);
  });

  // Simulates click to show less details
  test('if show details is true, simulate click showing less details', () => {
    const changeState = EventWrapper.setState({ handleDetails: true });
    EventWrapper.find('.details-btn').simulate('click', changeState);
    expect(EventWrapper.state('handleDetails')).toBe(true);
  });

  // Simulates click to show more details
  test('if show details is false, simulate click showing more details', () => {
    const changeState = EventWrapper.setState({ handleDetails: false });
    EventWrapper.find('.details-btn').simulate('click', changeState);
    expect(EventWrapper.state('handleDetails')).toBe(false);
  });

});


// describe('<Event /> component', () => {
//   let eventDetails;
//   beforeAll(() => {
//     eventDetails = shallow(<Event />)
//   });

//   // Renders the complete list of events
//   test('render the events list', () => {
//     const EventListWrapper = shallow(<EventList events={mockData} />);
//     expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
//   });

//   // Renders a show details button for the events
//   test('render show more button for the event', () => {
//     expect(eventDetails.find('.event-button')).toHaveLength(1);
//   });

//   // State when event list renders should be false
//   test('show details button should be false on render', () => {
//     expect(eventDetails.state('showDetails')).toBe(false);
//   });

//   // Simulates click to show less details
//   test('if show details is true, simulate click showing less details', () => {
//     const changeState = eventDetails.setState({ showDetails: true });
//     eventDetails.find('.event-button').simulate('click', changeState);
//     expect(eventDetails.state('showDetails')).toBe(true);
//   });

//   // Simulates click to show more details
//   test('if show details is false, simulate click showing more details', () => {
//     const changeState = eventDetails.setState({ showDetails: false });
//     eventDetails.find('.event-button').simulate('click', changeState);
//     expect(eventDetails.state('showDetails')).toBe(false);
//   });

// });