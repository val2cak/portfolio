import Head from 'next/head';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='index, follow'></meta>
        <link rel='icon' href='./favicon.ico' />
        <meta name='description' content='ValKey'></meta>
      </Head>

      <Toaster position='top-right' />

      <Component {...pageProps} />
    </>
  );
};

export default App;
