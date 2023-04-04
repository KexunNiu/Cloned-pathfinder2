import CONSTANTS from '../constants/constants';


/**
 * Description of our company in landing page.
 */
const About = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="mx-[20vw]">
        <h2 className="text-5xl p-5 font-bold">About {CONSTANTS.SITE_AUTHOR} 🖊️</h2>
        <p className="py-5 p-5 text-xl break-normal">
          {CONSTANTS.SITE_AUTHOR} is a social impact organization founded in 2015 in Edmonton, Alberta.
          Our goal is to empower children, youth, and adults from underrepresented and
          under-resourced communities in Canada, through initiatives that enhance their
          socioeconomic development and well-being.
          <br />
          <br />
          We partner with social service organizations, education providers, local businesses, and
          diverse community stakeholders, to create economic development pathways for Canadians
          through programs that foster work skills development, entrepreneurial culture and
          life-long learning.
          <br />
          <br />
          Our career education and experiential learning model ensures that all individuals have
          equal opportunity to pursue enriching careers and reach their full economic potential.
        </p>
      </div>
    </div>
  )
}

export default About
