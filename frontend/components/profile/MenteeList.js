import React from 'react'
import ModalListItem from './ModalListItem'

/**
 * A mentee list for modal popup (for mentor user).
 */
export default function MenteeList({ menteeList }) {
  return (
    <div className="container flex flex-col mx-auto  max-w-2xl w-full items-left justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
      <ul className="flex flex-col divide divide-y">
        {/* if items is empty show none available */}
        {JSON.parse(menteeList).length === 0 ? (
          <h1 className="text-sm text-center text-black font-bold mt-5">{'No Mentees'}</h1>
        ) : null}
        {JSON.parse(menteeList).map((mentee) => (
          <ModalListItem key={mentee.username} title={mentee.email} />
        ))}
      </ul>
    </div>
  )
}
