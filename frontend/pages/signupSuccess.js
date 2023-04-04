import React, { useCallback } from 'react'
import { useRouter } from 'next/router'
import RedirectLink from '../components/common/RedirectLink'

/**
 * Sign up form sent successfully page for Company users
 * Can redirect to home page.
 * @returns jsx
 */
export default function SignupSuccessForm() {
    const router = useRouter()
    const handleSubmit = useCallback(
        async (e) => {
            e.preventDefault()
            try {
                router.push('/')
            } catch (error) {
                console.log(error)
            }
        },
        [router]
    )

    return (
        <div
            className="bg-grey min-h-screen flex flex-col bg-no-repeat bg-cover"
            style={{ backgroundImage: `url(backgroundtint.png)` }}
        >
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-grey px-6 py-8 rounded-xl shadow-md text-black w-full ">
                    <form onSubmit={handleSubmit}>
                        <h1 className="mb-8 text-3xl font-bold text-center">Submit Successfully!</h1>
                        <p className="mb-2 text-lg text-center">Your application has sent Successfully!</p>
                        <p className="mb-2 text-lg text-center">When your application is approved, we will send you an email with your account.</p>
                        <div className="flex items-center justify-between">
                            <RedirectLink message="Want to go back home page?" href="/" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
