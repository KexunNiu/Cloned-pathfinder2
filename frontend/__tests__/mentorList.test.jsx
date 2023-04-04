/**
 * Test dashboard with mock data and mock functions
 */
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { userProfile } from '../__mocks__/userProfile';
import DashboardList from '../pages/mentors';
import cookie from 'react-cookies';


global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(userProfile),
  })
);


cookie.remove = jest.fn(() => Promise.resolve());


// Mock router to return the pathname of the current page
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/mentorList',
  })),
}));


describe('Mentor page', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it('Renders mentor page and has search box', async () => {
    const { container } = render(<DashboardList />);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
    });
    const searchBox = container.querySelector('input');

    expect(searchBox).toBeInTheDocument();

    // type in search box
    fireEvent.change(searchBox, { target: { value: 'test' } });
  });
});
