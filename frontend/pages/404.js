import LinkButton from '../components/common/LinkButton'
import Title from '../components/common/Title'

/**
 * Custom 404 page
 * @returns jsx
 */
const Custom404 = () => {
  return (
    <>
      <Title title="Page Stolen 😳" />
      <main className="text-center flex w-full h-screen items-center justify-center">
        <div>
          <h1 className="text-4xl font-bold">Page not found ¯\(°_o)/¯</h1>
          <LinkButton name="Back to Home" link={'/'} />
        </div>
      </main>
    </>
  )
}
export default Custom404
