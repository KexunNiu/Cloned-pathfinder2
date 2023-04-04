import React from 'react';
import { shallow } from 'enzyme';
import OpportunityList from '../pages/jobs';
import '../setupTests'

describe('OpportunityList component', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<OpportunityList />);
    expect(wrapper).toMatchSnapshot();
  });
});
