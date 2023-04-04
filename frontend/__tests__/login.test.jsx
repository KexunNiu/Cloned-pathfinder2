/**
 * Test login page with mock data and mock functions
 */
import LoginForm from '../pages/login'
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ access: '1234567890', refresh: '0987654321', name: '1232' }),
  })
)

describe('Login page', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('Test login with working credentials', async () => {
    const { container } = render(<LoginForm />)
    const loginButton = container.querySelector('button')
    const emailInput = container.querySelector('input[name="username"]')
    const passwordInput = container.querySelector('input[name="password"]')

    expect(loginButton).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()

    // populate email and password and click login button
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'test1234' } })
    fireEvent.click(loginButton)

    // should redirect to login page
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })
  it('Test login with incorrect email', () => {
    const { container } = render(<LoginForm />)
    const loginButton = container.querySelector('button')
    const emailInput = container.querySelector('input[name="username"]')
    const passwordInput = container.querySelector('input[name="password"]')

    expect(loginButton).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()

    // populate email and password and click login button
    fireEvent.change(emailInput, { target: { value: 'test' } })
    fireEvent.change(passwordInput, { target: { value: 'test1234' } })
    fireEvent.click(loginButton)

    // check if error message is displayed
    const errorMessage = container.querySelector('.error-msg')
    expect(errorMessage).toBeInTheDocument()
  })
  it('Test login with empty fields', async () => {
    const { container } = render(<LoginForm />)
    const loginButton = container.querySelector('button')
    const emailInput = container.querySelector('input[name="username"]')
    const passwordInput = container.querySelector('input[name="password"]')

    expect(loginButton).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()

    // populate email and click login button
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.click(loginButton)

    // check if error message is displayed
    const errorMessage = container.querySelector('.error-msg')
    expect(errorMessage).toBeInTheDocument()
  })
})
