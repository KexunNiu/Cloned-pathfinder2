import { useEffect, useState } from 'react';
/**
 * An item in a list of boards
 */


const ItemList = ({ onClick,link,eligibility,amount,deadline,opportunityType,skills,type, title, date,description, href, action, img }) => {
const [showModal, setShowModal] =useState(false);

  return (
    <>
      <div className="flex w-1/3 bg-white shadow-lg rounded-lg overflow-hidden mb-4">

        <div className="w-1/3">

          {img ? (
            <div className="flex items-center justify-center h-full w-full pl-4">
              <img src={img} alt="board item list" />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full w-full pl-4">
              <img src={img} alt="board item list" />
            </div>
          )}
        </div>
        <div className="w-2/3 p-4">

          <h1 className="w-full p-4 font-bold text-sm">{type}</h1>

          <div className="bg-white w-full p-4">

            <a href={href}>
              <p className="text-xl font-medium mb-2">{title}</p>
            </a>


           
           
           
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-black dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-white rounded-md group-hover:bg-opacity-0">
                Detail
              </span>
            </button>

          </div>
          <div className="p-2">

          </div>
        </div>
        <div className="w-3/3 p-4 px-0">
          {/* Only mentor list and company list have follow button. */}
          {type === 'Mentor' || type === 'Company' ? (
            <button
              type="button"
              className="py-2 px-2 mr-2 w-32 h-10 bg-deepBlue hover:bg-lightBlue focus:ring-deepBlue focus:ring-offset-none text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-full"
              onClick={action}
            >
              Follow
            </button>
          ) : null}
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
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">
                Name:{title}
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
            {opportunityType === "activity" ? (
              <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Link:{link}
              </p>
            </div>
            ):null}
            {opportunityType === "job" ? (
              <>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Post Date:{date}
              </p>
            </div>
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Skills:{skills}
              </p>
            </div>
            </>
            ):null}
            {opportunityType === "scholarship" ? (
               <>
             <div className="relative p-6 flex-auto">
               <p className="my-4 text-slate-500 text-lg leading-relaxed">
                 Deadline: {deadline}
               </p>
             </div>
             <div className="relative p-6 flex-auto">
               <p className="my-4 text-slate-500 text-lg leading-relaxed">
                
                 Amount: {amount}
               </p>
             </div>
             <div className="relative p-6 flex-auto">
               <p className="my-4 text-slate-500 text-lg leading-relaxed">
                 
                 Link: {link}
               </p>
             </div>
             <div className="relative p-6 flex-auto">
               <p className="my-4 text-slate-500 text-lg leading-relaxed">
               Eligibility: {eligibility}
               </p>
             </div>

             </>
             ) : null
             }
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                  Description:{description}
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
};
export default ItemList;