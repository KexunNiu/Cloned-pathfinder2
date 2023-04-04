import React from 'react'
import ModalListItem from './ModalListItem'

/**
 * A follower list for modal popup (for company user).
 */
export default function FollowerList({ followerList }) {
  return (
    <div className="container flex flex-col mx-auto  max-w-2xl w-full items-left justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
      <ul className="flex flex-col divide divide-y">
        {/* if items is empty show none available */}
        {JSON.parse(followerList).length === 0 ? (
          <h1 className="text-sm text-center text-black font-bold mt-5">{'No Followers'}</h1>
        ) : null}
        {JSON.parse(followerList).map((follower) => (
          <ModalListItem key={follower.first_name} title={follower.first_name} description={follower.bio} />
        ))}
      </ul>
    </div>
  )
}
