import CourseList from './CourseList'
import MentorList from './MentorList'
import MenteeList from './MenteeList'
import CompanyList from './CompanyList'
import FollowerList from './FollowerList'
import React, { useEffect, useState, useCallback } from 'react'

/**
 * A modal popup including a list in profile.
 */

export default function Modal({
  buttonTitle,
  modalTitle,
  listType,
  mentorList,
  menteeList,
  companyList,
  followerList,
}) {
  const [showModal, setShowModal] = useState(false)
  const [courses, setCourses] = useState([])

  const sendCourseList = (courseList) => {
    setCourses(courseList)
  }

  return (
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        {buttonTitle}
      </button>
      {showModal ? (
        <>
          <div className="justfy-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">{modalTitle}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  />
                </div>
                {listType === 'course' ? (
                  <CourseList sendCourseList={sendCourseList} />
                ) : listType === 'mentor' ? (
                  <MentorList mentorList={mentorList} />
                ) : listType === 'company' ? (
                  <CompanyList companyList={companyList} />
                ) : listType === 'mentee' ? (
                  <MenteeList menteeList={menteeList} />
                ) : (
                  <FollowerList followerList={followerList} />
                )}

                {/*footer: a close button*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
