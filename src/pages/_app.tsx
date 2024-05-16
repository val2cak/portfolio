import Head from 'next/head';
import dynamic from 'next/dynamic';
import { Toaster } from 'react-hot-toast';

import '../styles/globals.css';
import { usePageLoading } from '../hooks/usePageLoading';

const Loader = dynamic(() => import('../components/loader'), {
  ssr: false,
});

const App = ({ Component, pageProps }) => {
  const { isPageLoading } = usePageLoading();

  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='robots' content='index, follow'></meta>
        <link rel='icon' href='/favicon.ico' />
        <meta name='description' content='ValKey'></meta>
      </Head>

      <Toaster position='top-right' />

      {isPageLoading ? <Loader /> : <Component {...pageProps} />}
    </>
  );
};

export default App;
