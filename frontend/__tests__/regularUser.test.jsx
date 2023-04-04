import React from 'react';
import { shallow } from 'enzyme';
import DashboardList from '../pages/regularUsers';
import '../setupTests';

describe('DashboardList component', () => {
  it('should render without crashing', () => {
    const wrapper = shallow(<DashboardList/>);
    expect(wrapper.exists()).toBe(true);
  });
});