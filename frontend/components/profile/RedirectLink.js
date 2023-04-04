//A link to redirect (mainly use for website)
const RedirectLink = ({ href, message }) => {
  return (
    <div className="flex items-center justify-between">
      <p className="text-black" style={{ marginTop: '10px', marginBottom: '10px' }}>
        <a
          className="inline-block align-baseline font-bold text-sm text-[blue]"
          href={href}
        >
          {message}
        </a>
      </p>
    </div>
  )
}
export default RedirectLink