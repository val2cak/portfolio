import { useRouter } from 'next/router';

import en from '../locales/en';
import Layout from './layout';
import Button from '../components/button';
import woman from '../../public/images/woman.png';

const Home = () => {
  const { heading, title, subtitle, btnText } = en.home;
  const router = useRouter();

  return (
    <Layout>
      <div className='flex sm:h-full h-[90vh] sm:flex-col-reverse sm:px-8'>
        <div className='sm:w-full w-2/5 h-full flex flex-col justify-center gap-8'>
          <div className='flex flex-col'>
            <span className='tracking-wide sm:text-lg lg:text-lg text-xl text-light font-minecraft uppercase'>
              {heading}
            </span>
            <span className='tracking-wide sm:text-5xl lg:text-5xl text-8xl sm:leading-8 lg:leading-8 leading-12 text-yellow font-minecraft uppercase'>
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
        <div className='sm:w-full w-3/5 flex justify-center h-full'>
          <img src={woman.src} className='lg:p-8 p-4' />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
