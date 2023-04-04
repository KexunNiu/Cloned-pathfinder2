/**
 * Long paragraph input component
 */
const TextArea = ({ name, action, placeholder, style }) => {
  return (
    <textarea
      className="block border border-grey-light w-full h-40 p-2 rounded mb-0 mt-2 resize-none"
      cols="30"
      rows="30"
      name={name}
      onChange={action}
      placeholder={placeholder}
      style={style}
    />
  )
}
export default TextArea
