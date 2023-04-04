import React from 'react'
import NavHeader from '../components/common/Header'
import { useEffect, useState } from 'react'
import { get } from '../components/utils/Api'
import ActivityApplicationView from './ActivityApplicationView'
import Link from 'next/link'
import SearchBar from '../components/common/SearchBar'
import Pagination from '../components/common/Pagination'
import CONSTANTS from '../components/constants/constants'


const OpportunityList = () => {
    const [showModal, setShowModal] = React.useState(false);
    // const [jobList, setJobList] = useState([])
    // const [fullList, setFullList] = useState([])
    // const [scholarshipList, setScholarshipList] = useState([])
    const [activityList, setActivityList] = useState([])
    const [reRender, setReRender] = useState(0)
    const [userName, setUserName] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)
    const [id, setId] = useState()
    const [searchfield, setSearchfield] = useState('')
    const [activityShown,setactivityShown] = useState([])

    useEffect(() => {
      get(`auth/users/me/`)
        .then((userData) => {
          setId(userData.id)
          get(`api/app/profile/${userData.id}`)
            .then((data) => {
              setUserName(data.first_name + ' ' + data.last_name)
               })
            .catch((e) => {
              console.error(e.message)
            })
            get(`api/company/company-act-opp-sch-list`)

        .then((response) => {
            // setScholarshipList(response.scholarships)
            setActivityList(response.activities)
            setactivityShown(response.activities)
            console.log(response.activities)

        })
        .catch((error) => {
            console.error(error)
        });
        })
        .catch((e) => {
          console.error(e.message)

        })

    }, [userName, id])


    useEffect(() => { 
      if (searchfield.length === 0){
        if (activityList.length >0){
          setactivityShown(activityList)
        }
      } else {
        const fileteredList = activityList.filter((activity) => {
          return(
            activity.activity.name.toLowerCase().includes(searchfield.toLowerCase()) ||
            activity.activity.description.toLowerCase().includes(searchfield.toLowerCase())
          )
        })
        setactivityShown(fileteredList)
      }
    },[searchfield])

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = activityShown.slice(indexOfFirstPost, indexOfLastPost);

const activities = currentPosts.map((activity,index) => {
    if (activity.applicants.length != 0){
    return (
            <>
             <ActivityApplicationView key={index} activityData={activity} setReRender={setReRender}/>
             <br/>
            </>
          )}
})


  return (
   <>
        <div className="bg-primary min-h-screen flex flex-col">
            <div>
            <NavHeader />
            </div>
            <SearchBar setSearch={setSearchfield} />
            <div className="container m-auto max-w-2xl flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-sky-200 p-10 h-4/5 rounded-xl shadow-xl text-main w-full relative">

                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We work on exploring the world’s potential</h1>
                        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at {CONSTANTS.SITE_NAME} we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

                        <Link href={'/AllOpportunities'}>
                            <button className="text-cyan-500 border border-cyan-500 hover:bg-cyan-500 hover:text-white active:bg-cyan-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                >
                                <i className="fas fa-heart"></i> Scholarship
                            </button>
                        </Link>
                        <button className="text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                        >
                            <i className="fas fa-heart"></i> Activities
                        </button>
                        <Link href={'/jobApplication'}>
                        <button className="text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                           >
                                <i className="fas fa-heart"></i> Jobs
                            </button>
                        </Link>
                        <p>Activities:</p>
                            {activities}
                            <Pagination totalPosts={activityList.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
            </div>
        </div>
    </>

  );
}

export default OpportunityList;
