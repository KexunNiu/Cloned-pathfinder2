/**
 * A simple checkbox component
 */
const Checkbox = ({ onChange, isDisabled, value, message }) => {
  return (
    <div className="flex items-center mt-3 space-x-2">
      <label>
        {isDisabled == true ? (
          <input className="mx-1" type="checkbox" checked={value} disabled onChange={onChange} />
        ) : (
          <input className="mx-1" type="checkbox" checked={value} onChange={onChange} />
        )}
        {message}
      </label>
    </div>
  )
}
export default Checkbox
