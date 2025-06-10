import { FC, ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { camelCase } from 'lodash';

import Header from '../components/header';
import { translate } from '../locales/translate';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();

  const pathCamelCase = camelCase(router.pathname.split('/')[1]);

  const title =
    translate?.seo[pathCamelCase]?.title ?? translate?.seo.home.title;

  return (
    <>
      <NextSeo title={title} />

      <div className='relative'>
        <Header />
        <main
          className={`pt-24 sm:px-0 lg:px-24 px-40 2xl:px-56 min-h-screen sm:min-h-0 ${
            router.pathname === '/contact' &&
            'bg-mario sm:bg-marioMobile sm:bg-contain bg-cover bg-no-repeat bg-bottom'
          } ${router.pathname === '/projects' && 'sm:h-[85lvh]'} ${
            router.pathname === '/' && '!pt-20'
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
