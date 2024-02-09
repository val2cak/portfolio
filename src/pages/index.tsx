import { useRouter } from 'next/router';

import Button from '../components/button';
import Layout from './layout';
import woman from '../../public/images/woman.png';
import { translate } from '../locales/translate';

const Home = () => {
  const { heading, title, subtitle, btnText } = translate?.home;
  const router = useRouter();

  return (
    <Layout>
      <div className='flex h-full sm:flex-col-reverse sm:px-8'>
        <div className='sm:w-full w-2/5 h-full flex flex-col justify-center gap-8'>
          <div className='flex flex-col'>
            <span className='tracking-wide sm:text-md text-lg text-light font-minecraft uppercase'>
              {heading}
            </span>
            <span className='tracking-wide sm:text-4xl text-8xl sm:leading-8 leading-12 text-yellow font-minecraft uppercase'>
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
              className='sm:w-full'
            />
          </div>
        </div>
        <div className='sm:w-full w-3/5 flex justify-center'>
          <img src={woman.src} className='object-cover' />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
