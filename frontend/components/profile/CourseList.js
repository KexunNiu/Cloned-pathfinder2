import React, { useEffect, useState, useCallback } from 'react'
import ModalListItem from './ModalListItem'
import { useRouter } from 'next/router'

import { get, post_form } from '../utils/Api'

/**
 * A course list for modal popup.
 */
export default function CourseList({ sendCourseList }) {
  let [courses, setCourses] = useState([])
  const [Course, setCourse] = useState('')
  const [id, setId] = useState('')
  const [Description, setDescription] = useState('')
  const router = useRouter()
  let formData = new FormData()

  useEffect(() => {
    get(`auth/users/me/`)
      .then((userData) => {
        setId(userData.id)
        get(`api/courses/courses/${id}`)
          .then((data) => {
            setCourses(data)
          })
          .catch((e) => {
            console.error(e.message)
          })
      })
      .catch((e) => {
        console.error(e.message)
        RefreshOrRedirect(router)
      })
  }, [id])

  const handleCourseName = useCallback((event) => {
    setCourse(event.target.value)
  }, [])

  const handleCourseDescription = useCallback((event) => {
    setDescription(event.target.value)
  }, [])

  const addInput = () => {
    setCourses((s) => {
      return [...s, { Course, Description }]
    })

    formData.append('Course', Course || 'NA')
    formData.append('Description', Description || 'NA')
    formData.append('user', id || 'NA')

    post_form(`api/courses/all-courses`, formData)
      .then(() => {
        console.log('success')
      })
      .catch((e) => {
        console.error(e.message)
      })
  }

  return (
    <div className="container flex flex-col mx-auto  max-w-2xl w-full items-left justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
      <div className="flex mt-4 ml-4 mr-4">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker"
          placeholder="Add Course Name"
          onChange={handleCourseName}
        ></input>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-7 mr-4 text-grey-darker"
          placeholder="Add Course Details"
          onChange={handleCourseDescription}
        ></input>
        <button
          className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal"
          type="button"
          onClick={addInput}
        >
          Add
        </button>
      </div>
      <ul className="flex flex-col divide divide-y">
        {courses.map((course) => (
          <ModalListItem
            key={course.Course}
            title={course.Course}
            description={course.Description}
          />
        ))}
        {sendCourseList(courses)}
      </ul>
    </div>
  )
}
