import Link from 'next/link'

/**
 * Footer component
 */
const Footer = () => {
  return (
    <div className="items-center justify-center w-full mb-20 mx-[20vw] max-w-[60vw]">
      <h2 className="text-5xl font-bold">© PathFinder</h2>
      <div className="my-4 mx-auto w-4/5 h-1 md:my-10 border-t-main border-t-2"></div>
      <ul className="text-3xl grid grid-cols-2 gap-0">
        <li className="p-4 hover:underline">
          <Link href="/login">Login</Link>
        </li>
        <li className="p-4 hover:underline">
          <Link href="/mentor">Begin as a Mentor</Link>
        </li>
        <li className="p-4 hover:underline">
          <Link href="/contact">Contact us</Link>
        </li>
        <li className="p-4 hover:underline">
          <Link href="/companySignup">Partner as a Company</Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer
