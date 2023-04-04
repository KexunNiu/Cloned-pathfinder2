import LinkButton from "../components/common/LinkButton";
import OpportunityDetail from "./OpportunityDetail";
import { useEffect, useState } from 'react';
import { useParams,useNavigate} from 'react-router-dom';
import { get } from '../components/utils/Api';
import React from "react";
import Link from 'next/link'

function UserView({usersData}) {

  const [showModal, setShowModal] = React.useState(false);
  const [usersShown, setUsersShown] = useState([])
  
 
 
  return (
    <>
     <div className="max-w-sm  p-6 bg-white border border-sky-200 rounded-lg shadow-xl justify-center dark:bg-white  dark:border-sky-200">
    
    <div className="grid grid-rows-1 grid-flow-col gap-4">
      <div className="row-span-3 flex items-start ">
        <img src={`http://api.platform.pathfinder.test${usersData.profile_picture}` ?? '../../defaultUser.png'} width={100} height={150} alt='user profile picture'/>      
      </div>
      
      <div className="col-span-2 flex items-start relative">
      <h4 className="mb-2 absolute left-0 font-bold tracking-tight text-gray-700 dark:text-gray">{usersData.first_name + ' ' + usersData.last_name}</h4>
      </div>
      <div className="row-span-2 col-span-2 relative ...">
      <h3 className="mb-2 absolute left-0 font-bold tracking-tight text-gray-500 dark:text-gray">{usersData.Talents}</h3>
       
        
      </div>
    </div>
    <br/>
    <button
        className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-black dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
        type="button"
        onClick={() => setShowModal(true)}
      >
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
          more
        </span>
    </button>

    
        
  
</div>
  
  {showModal ? (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative  w-full my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
              User Details
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
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
              Username: {usersData.first_name + ' ' + usersData.last_name}
              </p>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
               Bio: {usersData.bio}
              </p>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Talents: {usersData.Talents}
              </p>
            </div>

            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Background: {usersData.background}
              </p>
            </div>

            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Interests: {usersData.interests}
              </p>
            </div>
            
            
            

            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              
              <button
                className="flex flex-row gap-2 flex-1 justify-center items-center rounded py-2 px-4 font-bold bg-red-500 text-white hover:bg-red-400"
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
export default UserView;