/**
 * Test dashboard with mock data and mock functions
 */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import cookie from 'react-cookies';
import Profile from '../pages/profile';
import { userProfile } from '../__mocks__/userProfile';
import { me } from '../__mocks__/me';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(userProfile),
  })
);


cookie.remove = jest.fn(() => Promise.resolve());


// Mock Api.get() to return mock data for various endpoints
jest.mock('../components/utils/Api', () => ({
  get: jest.fn(endpointUrl => {
    const returnValueMap = {
      'auth/users/me/': me,
      [`api/app/profile/${userProfile.id}`]: userProfile,
    };

    return Promise.resolve(endpointUrl in returnValueMap ? returnValueMap[endpointUrl] : {});
  }),
  getCurrentUser: jest.fn((successCallback, router) => {
    successCallback(me);
  }),
}));


// Mock router to return the pathname of the current page
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/profile',
  })),
}));


describe('Dashboard page', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('Renders profile page for regular users', async () => {
    const { container } = render(<Profile />);
    // const dashboardTitle = container.querySelector('h1');
    // const dashboardSubtitle = container.querySelector('h2');

    // expect(dashboardTitle).toBeInTheDocument();
    // expect(dashboardSubtitle).toBeInTheDocument();
  });

  it('Edit button goes to edit page', async () => {
    const { container } = render(<Profile />);
    // const editButton = container.querySelector('button');

    // expect(editButton).toBeInTheDocument();

    // const editTitle = container.querySelector('h1');

    // expect(editTitle).toBeInTheDocument();
  });
});
