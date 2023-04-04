/**
 * Test JobViewPage with mock data and mock functions
 */
import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import JobViewPage from '../pages/job/[id]';
import Api from '../components/utils/Api';
import { job } from '../__mocks__/job';
import { jobApplication } from '../__mocks__/job-application';
import { me } from '../__mocks__/me';
import { userProfile } from '../__mocks__/userProfile';


// Mock Api.get() to return mock data for various endpoints
jest.mock('../components/utils/Api', () => ({
  get: jest.fn(endpointUrl => {
    const returnValueMap = {
      'auth/users/me/': me,
      [`api/app/profile/${userProfile.id}`]: userProfile,
      [`api/opportunity/jobs/approved/${job.id}/${me.id}`]: {
        application: jobApplication,
        ...job
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
    pathname: `/job/${job.id}`,
    push: jest.fn(() => { }),
    query: { id: job.id },
  })),
}));


describe('Job view page', () => {
  beforeEach(() => { });

  it('Renders job view page with the correct info', async () => {
    // render the job page with mock router query id
    const { getByText } = render(<JobViewPage />);

    // wait for the job data to be fetched
    await waitFor(() => {
      expect(Api.get).toHaveBeenCalledTimes(2);
      expect(Api.getCurrentUser).toHaveBeenCalledTimes(4);
    });

    // check if the job info is rendered
    expect(getByText(job.job_title)).toBeInTheDocument();
    expect(getByText(job.job_description)).toBeInTheDocument();
    expect(getByText(job.job_skills)).toBeInTheDocument();
    expect(getByText(job.date_posted)).toBeInTheDocument();
  });
});
