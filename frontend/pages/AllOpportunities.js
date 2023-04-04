import React from 'react'
import Scholarshipsapplication from './Scholarshipsapplication'
import NavHeader from '../components/common/Header'
import { useEffect, useState } from 'react'
import { get } from '../components/utils/Api'
import Link from 'next/link'
import SearchBar from '../components/common/SearchBar'
import Pagination from '../components/common/Pagination'
import CONSTANTS from '../components/constants/constants'
import {formatCurrency} from '../components/utils/Formatting';


const OpportunityList = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [jobList, setJobList] = useState([])
    const [fullList, setFullList] = useState([])
    const [scholarshipList, setScholarshipList] = useState([])
    const [activityList, setActivityList] = useState([])
    const [reRender, setReRender] = useState(0)
    const [userName, setUserName] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(2)
    const [searchfield, setSearchfield] = useState('')
    const [id, setId] = useState()
    const [scholarshipsShown, setscholarshipsShown] = useState([])

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
            get(`api/company/all-act-opp-sch-list/`)

        .then((response) => {
            setScholarshipList(response.scholarships)
            setscholarshipsShown(response.scholarships) //
            setActivityList(response.activities)
            console.log(response.scholarships)

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
        if (scholarshipList.length > 0) {
          setscholarshipsShown(scholarshipList)
        }
      } else {
        // search bar
        const filteredList = scholarshipList.filter((scholarship) => {
          return (
            
            scholarship.scholarship.name.toLowerCase().includes(searchfield.toLowerCase()) ||
            scholarship.scholarship.description.toLowerCase().includes(searchfield.toLowerCase())
           
          )
        })
        setscholarshipsShown(filteredList)
      }
    }, [searchfield])
    



    //get a list of opportunities by all companies

  //   useEffect(() => {
  //     get(`api/company/company-act-opp-sch-list/${id}`)
  //     .then((response) => {
  //         setScholarshipList(response.scholarships)
  //         setActivityList(response.activities)
  //         console.log({id})
  //     })
  //     .catch((error) => {
  //         console.error(error)
  //     });
  // },[reRender])

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentOps = scholarshipsShown.slice(firstPostIndex, lastPostIndex);

  const scholarships = currentOps.map((scholarship, index) => {
    if (scholarship.applicants.length !=0 ){
    return (
        <>
        <Scholarshipsapplication key={index} scholarData={scholarship} setReRender={setReRender}/>
        <br/>
        </>
    )
    }
});




  return (
   <>
    <div className="bg-primary min-h-screen flex flex-col">
        <div>
          <NavHeader />
        </div>
        <SearchBar setSearch={setSearchfield} />
        <div className="container m-auto max-w-2xl flex-1 flex flex-col items-center justify-center px-2">
            <div className="bg-sky-200 overflow-y-scroll p-10 h-4/5 rounded-xl shadow-xl text-main w-full relative">

              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We work on exploring the world’s potential</h1>
                <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at {CONSTANTS.SITE_NAME} we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

                <button className="text-cyan-500 border border-cyan-500 hover:bg-cyan-500 hover:text-white active:bg-cyan-600 font-bold uppercase text-sm px-6 py-3 rounded-full outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                      >
                  <i className="fas fa-heart"></i> Scholarship
                </button>

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
                <p>Scholarships:</p>
                  {scholarships}
                  <Pagination totalPosts={scholarshipList.length} postsPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
              </div>
          </div>

    </div>
    </>

  );
}

export default OpportunityList;
