import Partner from '../components/landing/Partner'
import Skill from '../components/landing/Skill'
import About from '../components/landing/About'
import Footer from '../components/landing/Footer'
import Title from '../components/common/Title'
import CONSTANTS from '../components/constants/constants'


/**
 * Landing page
 * @returns jsx
 */
const Home = () => {
  return (
    <>
      <Title title={CONSTANTS.DEFAULT_PAGE_TITLE} />
      <div>
        <Skill />
        <About />
        <Partner />
        <Footer />
      </div>
    </>
  )
}

export default Home
