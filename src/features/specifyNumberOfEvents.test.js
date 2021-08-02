import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When a user hasn’t specified a number, 32 is the default number.', ({ given, and, when, then }) => {

    let AppWrapper;
    given('the user did not specify the number of events they want to see', () => {
      AppWrapper = mount(<App />);
    });

    and('the event list has been loaded', () => {
      expect(AppWrapper.state('events').length).toBeGreaterThan(0);
    });

    when('the application displays the list of events', () => {

    });

    then('the user should see a list with a maximum 32 events', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(mockData.length);
    });
  });

  test('User can change the number of events they want to see.', ({ given, when, then }) => {
    let AppWrapper;
    given('the user wants to change the number of events they see', () => {
      AppWrapper = mount(<App />);
    });

    when('the user enters or selects a number of events to be shown', () => {
      AppWrapper.find('.numberInput').simulate('change', { target: { value: '2' } });
    });

    then('the list will update displaying the number of events the user specified', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(2);
    });
  });

});