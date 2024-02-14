import { FC, ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { camelCase } from 'lodash';

import en from '../locales/en';
import Header from '../components/header';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();

  const pathCamelCase = camelCase(router.pathname.split('/')[1]);

  const title = en?.seo[pathCamelCase]?.title ?? en?.seo.home.title;

  return (
    <>
      <NextSeo title={title} />

      <div className='relative'>
        <Header />
        <main
          className={`pt-20 sm:px-0 lg:px-24 px-40 2xl:px-56 min-h-screen ${
            router.pathname === '/contact' &&
            'bg-mario sm:bg-marioMobile sm:bg-contain bg-cover bg-no-repeat bg-bottom'
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
