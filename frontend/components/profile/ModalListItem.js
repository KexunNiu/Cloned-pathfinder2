/**
 * Modal component
 */
const ModalListItem = ({ title, description }) => {
  return (
    <li className="flex flex-row">
      <div className="select-none cursor-pointer flex flex-1 items-center p-4">
        <div className="flex-1 pl-1 mr-16">
          <div className="font-medium dark:text-white">{title}</div>
          <div className="text-gray-600 dark:text-gray-200 text-sm">{description}</div>
        </div>
      </div>
    </li>
  )
}

export default ModalListItem
