/**
 * Test ScholarshipViewPage with mock data and mock functions
 */
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import ScholarshipViewPage from '../pages/scholarship/[id]';
import Api from '../components/utils/Api';
import { scholarship } from '../__mocks__/scholarship';
import { scholarshipApplication } from '../__mocks__/scholarship-application';
import { me } from '../__mocks__/me';
import { userProfile } from '../__mocks__/userProfile';


// Mock Api.get() to return mock data for various endpoints
jest.mock('../components/utils/Api', () => ({
  get: jest.fn(endpointUrl => {
    const returnValueMap = {
      'auth/users/me/': me,
      [`api/app/profile/${userProfile.id}`]: userProfile,
      [`api/scholarships/scholarship/approved/${scholarship.id}/${me.id}`]: {
        application: scholarshipApplication,
        ...scholarship
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
    pathname: `/scholarship/${scholarship.id}`,
    push: jest.fn(() => { }),
    query: { id: scholarship.id },
  })),
}));


describe('Scholarship view page', () => {
  beforeEach(() => { });

  it('Renders scholarship view page with the correct info', async () => {
    // render the scholarship page with mock router query id
    const { getByText } = render(<ScholarshipViewPage />);

    // wait for the scholarship data to be fetched
    await waitFor(() => {
      expect(Api.get).toHaveBeenCalledTimes(2);
      expect(Api.getCurrentUser).toHaveBeenCalledTimes(4);
    });

    // check if the scholarship info is rendered
    expect(getByText(scholarship.name)).toBeInTheDocument();
    expect(getByText(scholarship.description)).toBeInTheDocument();
    expect(getByText(scholarship.eligibility)).toBeInTheDocument();
    expect(getByText(scholarship.deadline)).toBeInTheDocument();
    expect(getByText(scholarship.amount)).toBeInTheDocument();
  });
});
