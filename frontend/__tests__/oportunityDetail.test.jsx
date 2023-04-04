import React from 'react';
import { shallow } from 'enzyme';
import NavHeader from '../components/common/Header';
import OpportunityDetail from '../pages/OpportunityDetail';
import '../setupTests';

describe('OpportunityDetail', () => {
  let wrapper;
  beforeEach(() => {

    wrapper = shallow(<OpportunityDetail jobData={{}} />);
  });

  it('should render NavHeader component', () => {
    expect(wrapper.find(NavHeader)).toHaveLength(1);
  });

  it('should render title, company name, date, description and skills', () => {
    expect(wrapper.find('.font-bold').at(0).text()).toEqual(' title');
    expect(wrapper.find('.font-bold').at(1).text()).toEqual(' company name');
    expect(wrapper.find('.font-bold').at(2).text()).toEqual('date');
    expect(wrapper.find('.font-normal').at(0).text()).toEqual(' desciption');
    expect(wrapper.find('.font-normal').at(1).text()).toEqual('skills');
  });
});
