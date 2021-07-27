import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
import { extractLocations } from '../api';
import { mockData } from '../mock-data';

describe('<NumberOfEvents /> compoment', () => {
  let NumberOfEventsWrapper, locations;

  beforeAll(() => {
    locations = extractLocations(mockData);
    NumberOfEventsWrapper = shallow(<NumberOfEvents locations={locations} updateEventsLength={() => null} />);
  });

  test('render the number of events textbox', () => {
    expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
  });

  test('render numberOfEvents input field', () => {
    expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
  });

  test('default numberOfEvents of events is 32', () => {
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(32);
  });

  test('renders numberOfEvents input correctly', () => {
    const numberOfEvents = NumberOfEventsWrapper.state('numberOfEvents');
    expect(NumberOfEventsWrapper.find('.numberInput').prop('value')).toBe(numberOfEvents);
  });

  test('change state when text input changes', () => {
    const eventObject = { target: { value: 1 } };
    NumberOfEventsWrapper.find('.numberInput').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numberOfEvents')).toBe(1);
  });

})