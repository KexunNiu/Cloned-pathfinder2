import React from 'react'
import NavHeader from '../components/common/Header'
import { useEffect, useState } from 'react'
import { get } from '../components/utils/Api'
import JobApplicationView from './jobApplicationView'
import Link from 'next/link'
import SearchBar from '../components/common/SearchBar'
import Pagination from '../components/common/Pagination'
import CONSTANTS from '../components/constants/constants'


const OpportunityList = () => {
    const [showModal, setShowModal] = React.useState(false);
    // const [jobList, setJobList] = useState([])
    // const [fullList, setFullList] = useState([])
    // const [scholarshipList, setScholarshipList] = useState([])
    const [jobList,setJobList] = useState([])
    const [reRender, setReRender] = useState(0)
    const [userName, setUserName] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(3)
    const [id, setId] = useState()
    const [searchfield, setSearchfield] = useState('')
    const [jobShown,setjobShown] = useState([])
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
            setJobList(response.job_postings)
            setjobShown(response.job_postings)
            console.log(response.job_postings)

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
        if (searchfield.length === 0) {
            if (jobList.length > 0) {
                setjobShown(jobList)
            }
              
            } else {
                const filteredList = jobList.filter((job) => {
                    console.log('searchfielddddd',searchfield)
                    return(
                        job.job.job_description.toLowerCase().includes(searchfield.toLowerCase()) ||
                        job.job.job_title.toLowerCase().includes(searchfield.toLowerCase())
                    )
                })
                setjobShown(filteredList)
            }
        
    },[searchfield])

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = jobShown.slice(indexOfFirstPost, indexOfLastPost);

const jobs = currentPosts.map((job,index) => {
    if (job.applicants.length != 0){
    return (
            <>
             <JobApplicationView key={index} jobData={job} setReRender={setReRender}/>
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
                        {/* <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">

                            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                        </a> */}
                        <Link href={'/AllOpportunities'}>
                            <button className="text-cyan-500 border border-cyan-500 hover:bg-cyan-500 hover:text-white active:bg-cyan-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                                >
                                <i className="fas fa-heart"></i> Scholarship
                            </button>
                        </Link>
                        <Link href={'/Activityapplication'}>
                            <button className="text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                            >
                                <i className="fas fa-heart"></i> Activities
                            </button>
                        </Link>
                        <Link href={'/jobApplication'}>
                        <button className="text-sky-500 border border-sky-500 hover:bg-sky-500 hover:text-white active:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                            >
                                <i className="fas fa-heart"></i> Jobs

                            </button>
                        </Link>
                        <p>Jobs:</p>
                            {jobs}
                            <Pagination totalPosts={jobList.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                </div>
            </div>
        </div>
    </>

  );
}

export default OpportunityList;
