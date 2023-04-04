import React from 'react';
import NavHeader from '../components/common/Header' 

export default function OpportunityDetail({jobData}){
    
  return (
    <div className="bg-primary min-h-screen flex flex-col">
    <div>
      <NavHeader />
    </div>
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
 
        <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white"> title</h5>
        <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white"> company name</h5>
        <h6 className="mb-1 font-bold tracking-tight text-gray-900 dark:text-white">date</h6>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> desciption</p> 
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">skills</p>

    </div>
    </div>
  )
}

 