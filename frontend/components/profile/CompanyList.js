import React from 'react'
import ModalListItem from './ModalListItem'

/**
 * A company list for modal popup.
 */
export default function CompanyList({ companyList }) {
  return (
    <div className="container flex flex-col mx-auto  max-w-2xl w-full items-left justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
      <ul className="flex flex-col divide divide-y">
        {/* if items is empty show none available */}
        {JSON.parse(companyList).length === 0 ? (
          <h1 className="text-sm text-center text-black font-bold mt-5">{'No Companies'}</h1>
        ) : null}
        {JSON.parse(companyList).map((company) => (
          <ModalListItem
            key={company.name}
            title={company.name}
            description={company.description}
          />
        ))}
      </ul>
    </div>
  )
}
