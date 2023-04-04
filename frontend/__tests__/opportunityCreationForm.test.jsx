import React from 'react';
import { shallow } from 'enzyme';
import ProfilePage from '../pages/opportunityCreationForm';
import '../setupTests'

describe('ProfilePage', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<ProfilePage />);
    expect(wrapper.exists()).toBe(true);
  });
});
