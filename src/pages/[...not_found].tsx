import { useRouter } from 'next/router';

import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';

import Button from '../components/button';

const NotFound = () => {
  const router = useRouter();

  return (
    <>
      <NextSeo title={'ValKey - Not Found'} />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='px-12 font-minecraft uppercase min-h-screen min-w-screen flex flex-col justify-center items-center gap-8 bg-notFound bg-bottom bg-no-repeat'
      >
        <div className='flex flex-col justify-center items-center'>
          <h1 className='sm:text-5xl text-7xl text-yellow'>Game over</h1>
          <h3 className='sm:text-md text-xl text-light'>
            Uh-oh! The page you are looking for is not here! Try again!
          </h3>
        </div>
        <Button
          text={'Restart'}
          handleOnClick={() => router.push('/')}
          className='text-yellow border-yellow sm:text-md text-lg'
        />
      </motion.div>
    </>
  );
};

export default NotFound;
