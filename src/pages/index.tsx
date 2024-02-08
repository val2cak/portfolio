import { useRouter } from 'next/router';

import Button from '../components/button';
import Layout from './layout';
import woman from '../../public/images/woman.png';
import { translate } from '../locales/translate';

const Home = () => {
  const { heading, title, subtitle, btnText } = translate.home;
  const router = useRouter();

  return (
    <Layout>
      <div className='flex h-full sm:flex-col-reverse'>
        <div className='sm:w-full w-2/5 h-full flex flex-col justify-center gap-8'>
          <div className='flex flex-col'>
            <span className='tracking-wide text-lg text-light font-minecraft uppercase'>
              {heading}
            </span>
            <span className='tracking-wide sm:text-5xl text-8xl leading-12 text-yellow font-minecraft uppercase'>
              {title}
            </span>
          </div>

          <span className='text-light opacity-50 text-md'>{subtitle}</span>

          <div className='sm:pb-8'>
            <Button
              text={btnText}
              handleOnClick={() => router.push('/projects')}
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
