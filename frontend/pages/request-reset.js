import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import FormField from '../components/common/FormField'
import Button from '../components/common/SubmitButton'
import RedirectLink from '../components/common/RedirectLink'
import ErrorMessage from '../components/common/ErrorMessage'
import { post_no_bearer } from '../components/utils/Api'

/**
 * Reset password page
 * @returns jsx
 */
export default function RequestReset() {
  const [emailError, setEmailError] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()

  const handleEmailChange = useCallback((event) => {
    setEmailError('')
  }, [])

  const handleReset = useCallback(
    async (e) => {
      e.preventDefault()
      sendData(e)
    }
  )

  function sendData(e) {
    let data = e.target
    let done = false
    post_no_bearer('auth/users/reset_password/', data)
      .then((response) => {
        console.log("logged response: ", response)
        try{
          if (response.message) {
            setEmailSent(true)
            done = true
          }
        } catch {}
        if (!done) {
          try{
            if (response.email) {
              setEmailError(response.email[0])
              done = true
            }
          } catch{}
        }
        if (!done) {
          try{
            setEmailError(response[0])
            done = true
          } catch{}
        }
      })
      .catch((e) => {
        const errorMessage = e.message
        console.error("looged message: ", errorMessage)
      })
  }

  return (
    <div
      className="bg-grey min-h-screen flex flex-col  bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(backgroundtint.png)` }}
    >
      <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-grey px-6 py-8  rounded-xl shadow-md text-black w-full">
          <form onSubmit={handleReset}>
            <h1 className="mb-8 text-3xl text-centerW">Reset Password</h1>
            <FormField
              type="email"
              name="email"
              action={handleEmailChange}
              placeholder="Email"
            />
            <ErrorMessage error={emailError}></ErrorMessage>

            <Button name="Confirm" />
            <RedirectLink message="Home Page:" href="/" />

            {emailSent && (
              <div
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
                role="alert"
              >
                <p className="block sm:inline">Recovery email sent successfully.</p>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  )
}
