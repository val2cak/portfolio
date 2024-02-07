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
          className={`pt-20 sm:px-8 px-40 2xl:px-56 sm:h-full h-dvh ${
            router.pathname === '/contact' && 'bg-mario bg-cover'
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
};

export default Layout;
