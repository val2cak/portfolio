import dynamic from 'next/dynamic';

import Layout from './layout';

const Home = () => {
  const Cover = dynamic(() => import('./components/cover'), {
    ssr: false,
  });

  return (
    <Layout>
      <Cover />
    </Layout>
  );
};

export default Home;
