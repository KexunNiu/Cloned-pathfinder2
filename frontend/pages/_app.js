import dynamic from 'next/dynamic';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '../styles/globals.css';
import Head from '../components/head/Head';


config.autoAddCss = false;


const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Head />
      <noscript>You need to enable JavaScript to run this app.</noscript>
      <Component {...pageProps} />
    </>
  );
};

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});
