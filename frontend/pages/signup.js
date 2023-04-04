import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import ErrorMessage from '../components/common/ErrorMessage'
import FormField from '../components/common/FormField'
import Button from '../components/common/SubmitButton'
import RedirectLink from '../components/common/RedirectLink'
import { post_form_no_bearer, post_no_bearer } from '../components/utils/Api'
import { getJWTToken } from '../components/utils/CookieStorage'

/**
 * Register page
 * @returns jsx
 */
export default function SignupForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [emailId, setEmailId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const router = useRouter()
  let validCheck = false

  // if has access token, redirect to home page
  useEffect(() => {
    if (getJWTToken()) {
      router.push('/dashboard')
    }
  }, [firstName, lastName, emailId, password, confirmPassword, firstNameError, lastNameError, emailError, passwordError, confirmPasswordError])

  const handleFirstNameChange = useCallback((e) => {
    setFirstNameError('')
    setFirstName(e.target.value)
  }, [])

  const handleLastNameChange = useCallback((e) => {
    setLastNameError('')
    setLastName(e.target.value)
  }, [])

  const handleEmailChange = useCallback((event) => {
    setEmailError('')
    setEmailId(event.target.value)
  }, [])

  const handlePasswordChange = useCallback((event) => {
    setPasswordError('')
    setPassword(event.target.value)
  }, [])

  const handleConfirmPasswordChange = useCallback((event) => {
    setConfirmPasswordError('')
    setConfirmPassword(event.target.value)
  }, [])

  const handleRegister = useCallback(async (e) => {
    e.preventDefault()
    const isFirstNameEmpty = firstName.length === 0
    const isLastNameEmpty = lastName.length === 0
    const isEmailEmpty = emailId.length === 0
    const isPasswordEmpty = password.length === 0
    const isConfirmPasswordEmpty = confirmPassword.length === 0
    const isPasswordMatched = password === confirmPassword
    validCheck = true

    // const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (isFirstNameEmpty) {
      setFirstNameError('First name is required')
      validCheck = false
    }
    if (isLastNameEmpty) {
      setLastNameError('Last name is required')
      validCheck = false
    }
    if (isEmailEmpty) {
      setEmailError('Email can not be empty.')
      validCheck = false
    }
    // if (!emailId.match(emailReg)) {
    //   setEmailError('Email is not valid.')
    //   validCheck = false
    // }
    if (isPasswordEmpty) {
      setPasswordError('Password can not be empty.')
      validCheck = false
    }
    if (password.length < 8) {
      setPasswordError('Password length must be at least 8 characters.')
      validCheck = false
    }
    if (isConfirmPasswordEmpty) {
      setConfirmPasswordError('Confirm Password can not be empty.')
      validCheck = false
    }
    if (!isPasswordMatched) {
      setConfirmPasswordError('Confirm password does not match password.')
      validCheck = false
    }

    if (validCheck) {
      sendData(e)
    }
  })

  function sendData(e) {
    if (validCheck) {
      let data = new FormData(e.target)
      data.append('email', data.get('username') || 'NA')
      post_form_no_bearer('auth/users/', data)
        .then((response) => {
          if (response.message) {
            // if response is ok, redirect to login page
            router.push({
              pathname: '/login',
              query: { isNew: true },
            })
          } else {
            try {
              // if bad request is from password, show password error
              setPasswordError(response.password[0])
            } catch { }
            try {
              // if bad request is from email(username), show email error
              setEmailError(response.username[0])
            } catch { }
          }
        })
        .catch((e) => {
          console.error(e)

          setEmailError(e.message)
        })
      validCheck = true
    }
  }

  return (
    <div
      className="bg-grey min-h-screen flex flex-col  bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(backgroundtint.png)` }}
    >
      <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-grey px-6 py-8 rounded shadow-md text-black w-full">
          <form onSubmit={handleRegister}>
            <h1 className="mb-8 text-3xl text-center">Sign up</h1>
            <FormField
              type="text"
              name="first_name"
              action={handleFirstNameChange}
              placeholder="First Name"
              required
            ></FormField>
            <ErrorMessage error={firstNameError}></ErrorMessage>

            <FormField
              type="text"
              name="last_name"
              action={handleLastNameChange}
              placeholder="Last Name"
              required
            ></FormField>
            <ErrorMessage error={lastNameError}></ErrorMessage>

            <FormField
              type="text"
              name="username"
              action={handleEmailChange}
              placeholder="Email"
            ></FormField>
            <ErrorMessage error={emailError}></ErrorMessage>

            <FormField
              type="password"
              name="password"
              action={handlePasswordChange}
              placeholder="Password"
            ></FormField>
            <ErrorMessage error={passwordError}></ErrorMessage>

            <FormField
              type="password"
              name="re_password"
              action={handleConfirmPasswordChange}
              placeholder="Confirm Password"
            ></FormField>
            <ErrorMessage error={confirmPasswordError}></ErrorMessage>

            <Button name="Sign Up" />
            <RedirectLink message="Have an account already?" href="/login" />
          </form>
        </div>
      </div>
    </div>
  )
}
