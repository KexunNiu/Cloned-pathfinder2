import Head from 'next/head'

/**
 * Sets the title of the page
 */
const Title = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  )
}
export default Title
