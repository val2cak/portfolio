import { FC, ReactNode } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { camelCase } from 'lodash';
import dynamic from 'next/dynamic';

import { translate } from '../locales/translate';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  const router = useRouter();

  const Header = dynamic(() => import('../components/header'), {
    ssr: false,
  });

  const pathCamelCase = camelCase(router.pathname);

  const title = translate.seo[pathCamelCase]?.title ?? translate.seo.home.title;

  return (
    <>
      <NextSeo title={title} />

      <div className='relative min-h-screen'>
        <Header />
        <main
          className={`sm:pb-[24rem] pb-56 ${
            (router.pathname === '/science' || router.pathname === '/news') &&
            'pt-14'
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
