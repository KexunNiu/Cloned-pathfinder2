import React from 'react'
import ModalListItem from './ModalListItem'

/**
 * A mentor list for modal popup (for Young People user).
 */
export default function MentorList({ mentorList }) {
  return (
    <div className="container flex flex-col mx-auto  max-w-2xl w-full items-left justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
      <ul className="flex flex-col divide divide-y">
        {/* if items is empty show none available */}
        {JSON.parse(mentorList).length === 0 ? (
          <h1 className="text-sm text-center text-black font-bold mt-5">{'No Mentors'}</h1>
        ) : null}
        {JSON.parse(mentorList).map((mentor) => (
          <ModalListItem key={mentor.id} title={mentor.email} />
        ))}
      </ul>
    </div>
  )
}
