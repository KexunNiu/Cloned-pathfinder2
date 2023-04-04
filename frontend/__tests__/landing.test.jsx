import { render } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'

describe('Landing page', () => {
  it('Test login and register button links', () => {
    const { container } = render(<Home />)
    const loginButton = container.querySelector('a[href="/login"]')
    // sign-in button with text "Start your Journey Now" should exist
    const registerButton = container.querySelector('#hero button')

    expect(loginButton).toBeInTheDocument()
    expect(registerButton).toBeInTheDocument()
  })
})
