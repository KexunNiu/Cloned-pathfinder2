
/**
 * Input component for profile
 */
const FormField = ({ type, name, action, placeholder, style, readOnly, value = '' }) => {
  return (
    <input
      type={type}
      className={`border border-grey-light p-2 rounded-xl mb-0 mt-5 ${readOnly ? 'cursor-not-allowed' : ''
        }`}
      name={name}
      onChange={action}
      placeholder={placeholder}
      style={style}
      readOnly={readOnly}
      value={value}
    />
  )
}
export default FormField
