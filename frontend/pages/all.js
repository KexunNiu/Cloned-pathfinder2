import React from 'react'
import OpportunityView from './opportunityView'
import ScholarshipView from './ScholarshipView'
import ActivityView from './ActivityView'
import NavHeader from '../components/common/Header'
import { useEffect, useState } from 'react'
import { get } from '../components/utils/Api'
import Link from 'next/link'
import SearchBar from '../components/common/SearchBar'
import CONSTANTS from '../components/constants/constants'

const OpportunityList = () => {
    const [showModal, setShowModal] = React.useState(false);
    const [jobList, setJobList] = useState([])
    const [fullList, setFullList] = useState([])
    const [activityList, setActivityList] = useState([])
    const [reRender, setReRender] = useState(0)


    useEffect(() => {
        get('api/opportunity/')
        .then((response) => {
            setJobList(response)
            //console.log(response)
        })
        .catch((error) => {
            console.error(error)
        });
    },[reRender])

    useEffect(() => {
      get('api/company/all-applications-list/-')
      .then((response) => {
          setFullList(response.scholarships)
          setActivityList(response.activities)
          console.log(response)
      })
      .catch((error) => {
          console.error(error)
      });
  },[reRender])

  const fullAll = fullList.map((scholarship, index) => {
    return (
        <>
        <ScholarshipView  key={index} scholarData={scholarship} setReRender={setReRender}/>
        <br/>
        </>
    )
});
console.log(activityList);


const aList = activityList.map((activity,index) => {
  return (
      <>
      <ActivityView  key={index} activityData={activity} setReRender={setReRender}/>
      <br/>
      </>
  )
});


  const listAll = jobList.map((job, index) => {
        return (
            <>
            <OpportunityView  key={index} jobData={job} setReRender={setReRender}/>
            <br/>
            </>
        )
  });

  return (
   <>
    <div className="bg-primary min-h-screen flex flex-col">
    <div>
      <NavHeader />
    </div>

    <SearchBar></SearchBar>

    <div className="hidden bg-black lg:flex lg:gap-x-1">

      <div className="relative">


        <div className="absolute -left-10  top-full z-40  w-screen max-w-md overflow-hidden rounded-3xl bg-sky-100 shadow-lg ">
          <div className="p-4">
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
                          Scholarships
                          <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>
                        </button>
            </div>
            <div className="relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 ">

              <div className="flex-auto">
                <a href="#" className="block font-semibold text-gray-900">
                  {fullAll}

                </a>
              </div>
            </div>




            <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
              <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                <svg className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <div className="flex-auto">
                <a href="#" className="block font-semibold text-gray-900">
                  Automations
                  <span className="absolute inset-0"></span>
                </a>
                <p className="mt-1 text-gray-600">Build strategic funnels that will convert</p>
              </div>
            </div>

          </div>
          </div>
        </div>
        </div>


    <div className="container max-w-4xl m-auto flex-col place-items-center justify-center px-2">

      <div className="bg-sky-200 p-10 h-4/5 rounded-xl shadow-xl text-main w-full relative">

      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">We work on exploring the world’s potential</h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">Here at {CONSTANTS.SITE_NAME} we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
        <a href="#" className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
            Posted jobs
            <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
        </a>
        <div className="grid grid-rows-2 grid-flow-col gap-4">

  <div className="row-end-3 row-span-2 ...">
  {listAll}
  </div>
  <div className="row-start-1 row-end-4 ...">
  <div
                    className="ml-10 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-sky-100 text-green-700 rounded-full"
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
                          Activities
                          <svg className="h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                          </svg>
                        </button>
            </div>

  {aList}
  </div>

</div>

<button
              className="bg-secondary hover:bg-blue text-white shadow-xl px-4 py-2 font-bold rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => setShowModal(true)}
            >

         Create a new opportunity

    </button>


       </div>

        <br/>


      </div>

    </div>

    {showModal ? (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex shadow-xl items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Choose the type
              </h3>



              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {/*body*/}

            <div className="relative p-6 shadow-xl flex-auto">
              <p className="my-1 text-slate-500 text-lg leading-relaxed">
                Create a new job post...

              <Link href={'/opportunityCreationForm'}>
              <button type="button" className="text-blue-700  shadow-xl border border-blue hover:bg-pink hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-blue dark:focus:ring-blue-800">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

              </button>
              </Link>
              </p>
             </div>
            <div className="relative p-6  shadow-xl flex-auto">
              <p className="my-1 text-slate-500 text-lg leading-relaxed">
                Create a new activity...
                <Link href={'/opportunityCreationForm'}>
                <button type="button" className="text-blue-700  shadow-xl border border-blue hover:bg-pink hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-blue dark:focus:ring-blue-800">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

                </button>
                </Link>
             </p>
            </div>
            <div className="relative p-6  shadow-xl flex-auto">
              <p className="my-1 text-slate-500 text-lg leading-relaxed">
                Create a new scholarship ...
              <Link href={'/scholarshipCreationForm'}>
              <button type="button" className="text-blue-700 shadow-xl font-bold border border-blue hover:bg-pink hover:text-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-blue dark:focus:ring-blue-800">
                  <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>

              </button>
              </Link>
            </p>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-pink-600 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  ) : null}
    </>

  );
}

export default OpportunityList;
