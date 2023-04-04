import React, { useEffect, useState, useCallback } from 'react'
import ErrorMessage from '../../../components/common/ErrorMessage'
import FormField from '../../../components/common/FormField'
import Button from '../../../components/common/SubmitButton'
import { useRouter } from 'next/router'
import RedirectLink from '../../../components/common/RedirectLink'
import { post_form_no_bearer } from '../../../components/utils/Api'
import FormData from 'form-data'

/**
 * Reset password confirm page
 * @returns jsx
 */
export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [resetDone, setResetDone] = useState(false)
  const router = useRouter()
  const { id, token } = router.query
  let validCheck = false

  const handlePasswordChange = useCallback((event) => {
    setPasswordError('')
    setPassword(event.target.value)
  }, [])

  const handleConfirmPasswordChange = useCallback((event) => {
    setConfirmPasswordError('')
    setConfirmPassword(event.target.value)
  }, [])

  const handleReset = useCallback(async (e) => {
    e.preventDefault()
    const isPasswordEmpty = password.length === 0
    const isConfirmPasswordEmpty = confirmPassword.length === 0
    const isPasswordMatched = password === confirmPassword
    validCheck = true

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
      let data = new FormData(e.target);
      data.append('uid', id || 'NA');
      data.append('token', token || 'NA');
      post_form_no_bearer('auth/users/reset_password_confirm/', data)
        .then((response) => {
          let done = false
          console.log(response)
          try{
            if (response.message) {
              setResetDone(true)
              done = true
            }
          } catch {}
          if (!done) {
            try{
              if (response.email) {
                setPasswordError(response.new_password[0])
                done = true
              }
            } catch{}
          }
          if (!done) {
            try{
              setPasswordConfirmError(response.non_field_errors[0])
              done = true
            } catch{}
          }
        })
        .catch((e) => {
          const errorMessage = e.message
          console.error(errorMessage)
        })
      validCheck = true
    }
  }

  return (
    <div
      className="bg-grey min-h-screen flex flex-col  bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(backgroundtint.png)` }}
    >
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-grey px-6 py-8  rounded-xl shadow-md text-black w-full">
          <form onSubmit={handleReset}>
            <h1 className="mb-8 text-3xl text-center">Reset Password</h1>
            <FormField
              type="password"
              name="new_password"
              action={handlePasswordChange}
              placeholder="Password"
            ></FormField>
            <ErrorMessage error={passwordError}></ErrorMessage>

            <FormField
              type="password"
              name="re_new_password"
              action={handleConfirmPasswordChange}
              placeholder="Confirm Password"
            ></FormField>
            <ErrorMessage error={confirmPasswordError}></ErrorMessage>
            <Button name="Confirm" />
            <RedirectLink message="Home Page:" href="/" />

            {resetDone && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
                role="alert"
              >
                <p className="block sm:inline">Password reset successfully.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
