import LinkButton from "../components/common/LinkButton";
import OpportunityDetail from "./OpportunityDetail";
import { useEffect, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import { host } from '../components/utils/Api';
import React from "react";
import Link from 'next/link'


function ScholarshipView({activityData, setReRender}) {
  const [showModal, setShowModal] = React.useState(false);
  const [image, setImage] = useState('');
  const [jobList, setJobList] = useState([])
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return date.toLocaleString('en-US',{
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });
  };



  return (
    <>

    <div className="max-w-sm p-6 bg-white border border-sky-200 rounded-lg shadow-xl justify-center dark:bg-white  dark:border-sky-200">



      <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
      {activityData.activity.isApproved === "True" ? (
        <div
        className="ml-4 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-green-200 text-green-700 rounded-full"
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
        Approved
      </div>
      ) : (
        <div
          className="ml-1 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-red-200 text-red-700 rounded-full"
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
            className="feather feather-archive mr-2"
          >
            <polyline points="21 8 21 21 3 21 3 8"></polyline>
            <rect x="1" y="3" width="22" height="5"></rect>
            <line x1="10" y1="12" x2="14" y2="12"></line>
          </svg>
          Not Approved

        </div>
      )
    }
    </time>
    <a href="#">
    <img className='w-2/3 h-64 ml-10' src={activityData.activity.activity_picture ? host+activityData.activity.activity_picture : '../../defaultSch.png'}/>
        <h3 className="mb-2 font-bold tracking-tight text-gray-500 dark:text-gray">Name: {activityData.activity.name}</h3>
        <h3 className="mb-2 font-bold tracking-tight text-gray-500 dark:text-gray">Description: {activityData.activity.description}</h3>
        <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-black">Application#: {activityData.applicants.length}</h5>

    </a>
    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"></p>

    <button
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-black dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
           Application Details
        </span>
    </button>




</div>

  {showModal ? (
    <>
     <div
        className="justify-center items-center flex overflow-x-hidden fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-full my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 h-screen overflow-y-scroll rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
               Applicants
              </h3>
              <a href="#" className="font-medium text-blue dark:text-blue hover:underline"></a>
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
            <div className="relative p-6 flex-auto">


              <h4>{activityData.applicants.map((item, index)=>{
                    return(
                            <>
                            <div className="relative p-6 flex-auto">
                            {/* <h3 className="mb-2 text-slate-500 text-lg leading-relaxed"
                                key={index}
                                > Applicant {index+1}
                            </h3> */}
                             <div
                                className="ml-10 text-xs inline-flex items-center font-bold leading-sm uppercase px-3 py-1 bg-sky-200 text-green-700 rounded-full">

                                    <h5 className="mb-2  text-slate-500 text-lg leading-relaxed"
                                        key={index}
                                        > name: {item.Name}
                            </h5>
                            {item.Recommended === true ? (
                                    <span
                                  className="inline-block whitespace-nowrap rounded-[0.27rem] bg-primary-100 px-[0.65em] pt-[0.35em] pb-[0.25em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700"
                                  >Recommended</span>
                                   ):null }
                            </div>
                            <h5 className="mb-2  text-slate-500 text-lg leading-relaxed"
                                key={index}
                                >Bio: {item.Bio}
                            </h5>
                            <h5 className="mb-2  text-slate-500 text-lg leading-relaxed"
                                key={index}
                                >Talents: {item.Talents}
                            </h5>
                            <h5 className="mb-2  font-bold tracking-tight text-gray-400 dark:text-gray"
                                key={index}
                                >Application Details: {item.Details}
                            </h5>
                            <h5 className="mb-2  font-bold tracking-tight text-gray-400 dark:text-gray"
                                key={index}
                                >Application Date: {formatDate(item.Date)}
                            </h5>

                            </div>
                            </>
                    )
                })}</h4>

            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button className="flex flex-row gap-2 flex-1 justify-center items-center rounded py-2 px-4 font-bold bg-red-500 text-white hover:bg-red-400"
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
  )
  }
export default ScholarshipView;
