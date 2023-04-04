import { useEffect, useState } from 'react'
import * as React from 'react';
import UserView from './UserView';
import Header from '../components/common/Header'
import SearchBar from '../components/common/SearchBar'
import { getQuery } from '../components/utils/Api'
import Pagination from '../components/common/Pagination'
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
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)

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


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentUsers = usersShown.slice(firstPostIndex, lastPostIndex);
    const listAll = currentUsers.map((user) => {
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

                <div
                      className="ml-10 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-sky-200 text-green-700 rounded-full"
                    >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-arrow-right mr-2"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                        <button type="button" className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900" aria-expanded="false">
                             List of users
                              <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                              </svg>
                        </button>
                      </div>
                        {listAll}
                        <Pagination totalPosts={usersShown.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
             </div>
        </div>
    )
}

export default DashboardList
