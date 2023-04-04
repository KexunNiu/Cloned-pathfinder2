/**
 * Test dashboard with mock data and mock functions
 */
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import Dashboard from '../pages/dashboard';
import { userProfile } from '../__mocks__/userProfile';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(userProfile),
  })
);


// Mock router to return the pathname of the current page
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/dashboard',
  })),
}));


describe('Dashboard page', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('Renders dashboard page for regular users', async () => {
    const { container } = render(<Dashboard />);
    const dashboardTitle = container.querySelector('h1');

    expect(dashboardTitle).toBeInTheDocument();
    // expect(dashboardSubtitle).toBeInTheDocument()
  });
});
