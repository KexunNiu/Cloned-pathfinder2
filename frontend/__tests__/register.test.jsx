/**
 * Test register page with mock data and mock functions
 */
import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import SignupForm from '../pages/signup'
import Api from '../components/utils/Api'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ access: '1234567890', refresh: '0987654321' }),
  })
)

describe('Register page', () => {
  beforeEach(() => {
    fetch.mockClear()
  })

  it('Test register page with working credentials', async () => {
    const { container } = render(<SignupForm />)
    const registerButton = container.querySelector('button')
    const emailInput = container.querySelector('input[name="username"]')
    const firstName = container.querySelector('input[name="first_name"]')
    const lastName = container.querySelector('input[name="last_name"]')
    const passwordInput = container.querySelector('input[name="password"]')
    const confirmPasswordInput = container.querySelector('input[name="re_password"]')

    expect(registerButton).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(firstName).toBeInTheDocument()
    expect(lastName).toBeInTheDocument()

    // populate email and password and click register button
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'test1234' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'test1234' } })
    fireEvent.change(firstName, { target: { value: 'test' } })
    fireEvent.change(lastName, { target: { value: 'test' } })
    fireEvent.click(registerButton)

    // should redirect to login page
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1)
    })
  })
  it('Test register page with invalid email', () => {
    const { container } = render(<SignupForm />)
    const registerButton = container.querySelector('button')
    const emailInput = container.querySelector('input[name="username"]')
    const passwordInput = container.querySelector('input[name="password"]')
    const confirmPasswordInput = container.querySelector('input[name="re_password"]')

    expect(registerButton).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()

    // populate email and password and click login button
    fireEvent.change(emailInput, { target: { value: 'test' } })
    fireEvent.change(passwordInput, { target: { value: 'test1234' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'test1234' } })
    fireEvent.click(registerButton)

    // check if error message is displayed
    const errorMessage = container.querySelector('.error-msg')
    expect(errorMessage).toBeInTheDocument()
  })
  it('Test register page with empty fields', async () => {
    const { container } = render(<SignupForm />)
    const registerButton = container.querySelector('button')
    const emailInput = container.querySelector('input[name="username"]')
    const passwordInput = container.querySelector('input[name="password"]')
    const confirmPasswordInput = container.querySelector('input[name="re_password"]')

    expect(registerButton).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()

    // populate email and password and click login button
    fireEvent.change(emailInput, { target: { value: '' } })
    fireEvent.change(passwordInput, { target: { value: '' } })
    fireEvent.change(confirmPasswordInput, { target: { value: '' } })
    fireEvent.click(registerButton)

    // check if error message is displayed
    const errorMessage = container.querySelector('.error-msg')
    expect(errorMessage).toBeInTheDocument()
  })
  it('Test register page with non matching password', async () => {
    const { container } = render(<SignupForm />)
    const registerButton = container.querySelector('button')
    const emailInput = container.querySelector('input[name="username"]')
    const passwordInput = container.querySelector('input[name="password"]')
    const confirmPasswordInput = container.querySelector('input[name="re_password"]')

    expect(registerButton).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()

    // populate email and password and click login button
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'test1234' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'test12345' } })
    fireEvent.click(registerButton)

    // check if error message is displayed
    const errorMessage = container.querySelector('.error-msg')
    expect(errorMessage).toBeInTheDocument()
  })
})
