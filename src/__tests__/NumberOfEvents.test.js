import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> compoment', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render the number of events textbox', () => {
    expect(NumberOfEventsWrapper.find('.numberInput')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    const query = NumberOfEventsWrapper.state('query');
    expect(NumberOfEventsWrapper.find('.numberInput').prop('value')).toBe(query);
  });

  test('change state when text input changes', () => {
    NumberOfEventsWrapper.setState({
      query: '32'
    });
    const eventObject = { target: { value: '5' } };
    NumberOfEventsWrapper.find('.numberInput').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('query')).toBe('5');
  });

})