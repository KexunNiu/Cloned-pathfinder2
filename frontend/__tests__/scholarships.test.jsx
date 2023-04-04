/**
 * Test dashboard with mock data and mock functions
 */
import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import ScholarshipList from '../pages/scholarships';
import Api from '../components/utils/Api';
import { scholarships } from '../__mocks__/scholarships';
import { me } from '../__mocks__/me';


// jest mock get(`api/scholarships/all-scholarships`) from Api.js
jest.mock('../components/utils/Api', () => ({
  get: jest.fn(() => Promise.resolve(scholarships)),
  getCurrentUser: jest.fn((successCallback, router) => {
    successCallback(me);
  }),
}));


// Mock router to return the pathname of the current page
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    pathname: '/scholarships',
  })),
}));


describe('Scholarships page', () => {
  beforeEach(() => { });

  it('Renders scholarships page and has search box', async () => {
    const { container } = render(<ScholarshipList />);
    const searchBox = container.querySelector('input');

    expect(searchBox).toBeInTheDocument();

    // wait for mock api get to resolve
    await waitFor(() => {
      expect(Api.get).toHaveBeenCalled();
    });

    // has at least one scholarship
    // const scholarship = container.querySelector('p')
    // expect(scholarship).toBeInTheDocument()

    // type in search box
    fireEvent.change(searchBox, { target: { value: 'Some search text' } });

    // should have no scholarships
    const noScholarship = container.querySelector('p');
    expect(noScholarship).not.toBeInTheDocument();
  });
});
