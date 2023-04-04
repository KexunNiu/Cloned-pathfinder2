import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import Custom404 from '../pages/404'
import LoginForm from '../pages/login'
import SignupForm from '../pages/signup'

describe('Home', () => {
  it('renders home', () => {
    const { container } = render(<Home />)

    expect(container).toBeInTheDocument()
  })
})

describe('404', () => {
  it('renders 404', () => {
    const { container } = render(<Custom404 />)

    expect(container).toBeInTheDocument()
  })
})

describe('register page', () => {
  it('register company', () => {
    const { container } = render(<SignupForm />)

    expect(container).toBeInTheDocument()
  })
})

describe('company login', () => {
  it('renders login', () => {
    const { container } = render(<LoginForm />)

    expect(container).toBeInTheDocument()
  })
})
