import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';

import Button from '../components/button';
import woman from '../../public/images/woman.png';
import { translate } from '../locales/translate';

const Layout = dynamic(() => import('./layout'), {
  ssr: false,
});

const Home = () => {
  const { heading, title, subtitle, btnText } = translate.home;
  const router = useRouter();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='flex sm:h-full h-[90vh] sm:flex-col-reverse sm:px-8'
      >
        <div className='sm:w-full w-1/2 h-full flex flex-col justify-center gap-8'>
          <div className='flex flex-col'>
            <span className='tracking-wide sm:text-md lg:text-lg text-xl text-light font-minecraft uppercase'>
              {heading}
            </span>
            <span className='tracking-wide sm:text-4xl lg:text-5xl text-8xl sm:leading-8 lg:leading-8 leading-12 text-yellow font-minecraft uppercase'>
              {title}
            </span>
          </div>

          <span className='text-light opacity-50 sm:text-base text-md'>
            {subtitle}
          </span>

          <div className='sm:pb-8'>
            <Button
              text={btnText}
              handleOnClick={() => router.push('/projects')}
              className='sm:w-full hover:border-blue hover:text-blue'
            />
          </div>
        </div>
        <div className='sm:w-full w-1/2 flex justify-center h-full'>
          <img src={woman.src} className='lg:p-8 p-4' />
        </div>
      </motion.div>
    </Layout>
  );
};

export default Home;
