import { useEffect, useState } from 'react'
import * as React from 'react';
import UserView from './UserView';
import Header from '../components/common/Header'
import SearchBar from '../components/common/SearchBar'
import { getQuery } from '../components/utils/Api'
import CONSTANTS from '../components/constants/constants'


/**
 * View a list of all regular young users
 * @returns jsx
 */
function DashboardList() {
    const [usersShown, setUsersShown] = useState([])
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [showModal, setShowModal] = React.useState(false);
    const [profile, setProfile] = useState([]);


    useEffect(() => {
        getQuery(`api/app/regular-users/search`, search)
            .then((data) => {

                setUsers(data)
                setUsersShown(data)
                console.log(data)
            })
            .catch((e) => {
                console.error(e.message)
            })
    }, [search])


    const listAll = usersShown.map((user) => {
       return (
        <>
        <UserView usersData={user}/>
        <br />
        </>
       )
    })

    return (

        <div className="bg-primary min-h-screen flex flex-col">
            <div>
                <Header />
            </div>

            <SearchBar setSearch={setSearch} />

            <div className="container max-w-2xl m-auto flex-col place-items-center justify-center px-2">

                <div className="bg-sky-200 p-10 h-4/5 rounded-xl shadow-xl text-main w-full relative">

                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We work on exploring the world’s potential</h1>
                        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at {CONSTANTS.SITE_NAME} we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
                        <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
                        List of users
                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a>
                        {listAll}
                </div>
             </div>
        </div>
    )
}

export default DashboardList
