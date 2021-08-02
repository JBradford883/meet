import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import Event from '../Event';

import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {

  test('An event element is collapsed by default.', ({ given, when, then }) => {
    let AppWrapper;
    given('the list of events has been loaded', () => {
      AppWrapper = mount(<App />);
    });

    when('the user does not perform any action', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.event').hostNodes()).toHaveLength(mockData.length);
    });

    then('the event element should be collapsed', () => {
      expect(AppWrapper.find('.event .details-btn')).toEqual({});
    });
  });

  let EventWrapper;
  let event = mockData[0];
  test('User can expand an event to see its details.', ({ given, when, then }) => {
    given('the list of elements has been loaded', () => {
      EventWrapper = shallow(<Event event={event} />);
    });

    when('user opens the event element', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event element should expand to show the event details', () => {
      expect(EventWrapper.find('.event .show-details')).toBeDefined();
    });
  });

  test('User can collapse an event to hide its details.', ({ given, when, then }) => {
    given('the user has opened the event element', () => {
      EventWrapper = shallow(<Event event={event} />)
      EventWrapper.find('.details-btn').simulate('click');
      expect(EventWrapper.find('.event .show-details')).toBeDefined();
    });

    when('user selects hide details button for the event', () => {
      EventWrapper.find('.details-btn').simulate('click');
    });

    then('the event element will collapse to hide the event details', () => {
      expect(EventWrapper.find('.event .show-details')).toEqual({});
    });
  });

});