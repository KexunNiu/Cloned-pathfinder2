/**
 * Test ActivityViewPage with mock data and mock functions
 */
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import ActivityViewPage from '../pages/opportunity/[id]';
import Api from '../components/utils/Api';
import { activity } from '../__mocks__/activity';
import { activityApplication } from '../__mocks__/activity-application';
import { me } from '../__mocks__/me';
import { userProfile } from '../__mocks__/userProfile';


// Mock Api.get() to return mock data for various endpoints
jest.mock('../components/utils/Api', () => ({
  get: jest.fn(endpointUrl => {
    const returnValueMap = {
      'auth/users/me/': me,
      [`api/app/profile/${userProfile.id}`]: userProfile,
      [`api/activities/activity/approved/${activity.id}/${me.id}`]: {
        application: activityApplication,
        ...activity
      },
    };

    return Promise.resolve(endpointUrl in returnValueMap ? returnValueMap[endpointUrl] : {});
  }),
  getCurrentUser: jest.fn((successCallback, router) => {
    successCallback(me);
  }),
}));


// Mock router to return the opportunity id
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: `/opportunity/${activity.id}`,
    push: jest.fn(() => { }),
    query: { id: activity.id },
  })),
}));


describe('Activity view page', () => {
  beforeEach(() => { });

  it('Renders activity view page with the correct info', async () => {
    // render the activity page with mock router query id
    const { getByText } = render(<ActivityViewPage />);

    // wait for the activity data to be fetched
    await waitFor(() => {
      expect(Api.get).toHaveBeenCalledTimes(2);
      expect(Api.getCurrentUser).toHaveBeenCalledTimes(4);
    });

    // check if the activity info is rendered
    expect(getByText(activity.name)).toBeInTheDocument();
    expect(getByText(activity.description)).toBeInTheDocument();
  });
});
