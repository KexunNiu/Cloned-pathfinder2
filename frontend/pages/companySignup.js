import React, { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import ErrorMessage from '../components/common/ErrorMessage'
import FormField from '../components/common/FormField'
import TextArea from '../components/profile/TextArea'
import Button from '../components/common/SubmitButton'
import RedirectLink from '../components/common/RedirectLink'
import { post_no_bearer } from '../components/utils/Api'
import { getJWTToken } from '../components/utils/CookieStorage'
import CONSTANTS from '../components/constants/constants'


/**
 * Register page for Company users
 * Will send a sign up form to backend
 * @returns jsx
 */
export default function SignupForm() {
    const [name, setName] = useState('')
    const [background, setBackground] = useState('')
    const [email, setEmail] = useState('')
    const [website, setWebsite] = useState('')
    const [description, setDescription] = useState('')
    const [nameError, setNameError] = useState('')
    const [backgroundError, setBackgroundError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [websiteError, setWebsiteError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')

    const router = useRouter()
    let validCheck = false

    // if has access token, redirect to home page
    useEffect(() => {
        if (getJWTToken()) {
            router.push('/dashboard')
        }
    }, [name, background, email, website, description, nameError, backgroundError, emailError, websiteError, descriptionError])

    const handleNameChange = useCallback((event) => {
        setNameError('')
        setName(event.target.value)
    }, [])

    const handleBackgroundChange = useCallback((event) => {
        setBackgroundError('')
        setBackground(event.target.value)
    }, [])

    const handleEmailChange = useCallback((event) => {
        setEmailError('')
        setEmail(event.target.value)
    }, [])

    const handleWebsiteChange = useCallback((event) => {
        setWebsiteError('')
        setWebsite(event.target.value)
    }, [])

    const handleDescriptionChange = useCallback((event) => {
        setDescriptionError('')
        setDescription(event.target.value)
    }, [])

    const handleRegister = useCallback(async (e) => {
        e.preventDefault()
        const isNameEmpty = name.length === 0
        const isBackgroundEmpty = background.length === 0
        const isEmailEmpty = email.length === 0
        const isWebsiteEmpty = website.length === 0
        const isDescriptionEmpty = description.length === 0
        validCheck = true

        const emailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        const webReg = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g

        if (isNameEmpty) {
            setNameError('Name can not be empty.')
            validCheck = false
        }
        if (isBackgroundEmpty) {
            setBackgroundError('Background can not be empty.')
            validCheck = false
        }
        if (isEmailEmpty) {
            setEmailError('Email can not be empty.')
            validCheck = false
        }
        if (!email.match(emailReg)) {
            setEmailError('Email is not valid.')
            validCheck = false
        }
        if (isWebsiteEmpty) {
            setWebsiteError('Website can not be empty.')
            validCheck = false
        }
        if (!website.match(webReg)) {
            setWebsiteError('Website is not valid. Please include http(s)://')
            validCheck = false
        }
        if (isDescriptionEmpty) {
            setDescriptionError('Description can not be empty.')
            validCheck = false
        }

        if (validCheck) {
            sendData(e)
        }
    },
        [name, background, email, website, description]
    )

    function sendData(e) {
        if (validCheck) {
            post_no_bearer('api/company/Companyapplication', e.target)
                .then(() => {
                    router.push('/signupSuccess')
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
            <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-grey px-6 py-8 rounded shadow-md text-black w-full">
                    <form onSubmit={handleRegister}>
                        <h1 className="mb-8 text-3xl text-center">Company Signup</h1>
                        <FormField
                            type="text"
                            name="name"
                            action={handleNameChange}
                            placeholder="Company Name"
                        ></FormField>
                        <ErrorMessage error={nameError}></ErrorMessage>

                        <TextArea
                            name="background"
                            action={handleBackgroundChange}
                            placeholder="Company Background"
                        ></TextArea>
                        <ErrorMessage error={backgroundError}></ErrorMessage>

                        <FormField
                            type="text"
                            name="Company_email"
                            action={handleEmailChange}
                            placeholder="Company official Email"
                        ></FormField>
                        <ErrorMessage error={emailError}></ErrorMessage>

                        <FormField
                            type="text"
                            name="website"
                            action={handleWebsiteChange}
                            placeholder="Company official Website Link"
                        ></FormField>
                        <ErrorMessage error={websiteError}></ErrorMessage>

                        <TextArea
                            name="description"
                            action={handleDescriptionChange}
                            placeholder={`Why you want to apply? What do you want to do in ${CONSTANTS.SITE_NAME}?`}
                        ></TextArea>
                        <ErrorMessage error={descriptionError}></ErrorMessage>

                        <Button name="Send" />
                        <RedirectLink message="Have an account already?" href="/login" />
                    </form>
                </div>
            </div>
        </div>
    )
}
