import LinkButton from '../common/LinkButton';
import CONSTANTS from '../constants/constants';


/**
 * Call to action component
 */
const Skill = () => {
  return (
    <div
      id="hero"
      className="flex flex-row items-center justify-center min-h-screen bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url(backgroundtint.png)`,
      }}
    >
      <div className="flex-[4] ml-[20vw]">
        <h2 className="text-7xl p-4 font-bold">{CONSTANTS.SITE_NAME}</h2>
        <p className="py-5 p-4 text-3xl">
          A new way to connect
          <br /> to your community
        </p>
        <LinkButton name="Start your Journey Now" link={'/signup'} />
      </div>
      <div className="flex flex-[2] items-start justify-end h-screen w-full mr-10">
        <LinkButton name="Login" link={'/login'} />
      </div>
    </div>
  )
}

export default Skill
