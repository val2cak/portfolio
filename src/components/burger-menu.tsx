import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  BsLinkedin as LinkedinIcon,
  BsInstagram as InstagramIcon,
  BsGithub as GithubIcon,
  BsWhatsapp as WhatsappIcon,
  BsFileEarmarkArrowDownFill as ResumeIcon,
} from 'react-icons/bs';
import { ImMenu as MenuIcon } from 'react-icons/im';
import { useState } from 'react';

import logo from '../../public/images/logo.png';
import { contentfulResumeUrl } from '../constants/contentful-files';
import { locale, translate } from '../locales/translate';
import LanguageDropdown from './language-dropdown';
import { Language } from '../types/language-types';
import { setLocaleToStorage } from '../services/local-storage';
import { languages } from '../constants/languages';

const BurgerNavigation = ({ isOpen, navigationItems, setIsOpen }) => {
  const router = useRouter();
  const [currentLanguage, setCurrentLanguage] = useState(locale);

  return (
    <main
      className={`${
        !isOpen ? 'translate-x-full' : 'translate-x-0'
      } bg-dark top-0 transform translate fixed right-0 m-0 p-0 bg-primary w-screen transition duration-500 ease-in-out flex-col justify-center items-center h-screen z-30`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className='flex justify-between py-8 px-8'>
        <Link href='/' className='text-light text-base font-bold uppercase'>
          <img src={logo.src} alt='Logo' className='h-6' />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className='text-light focus:outline-none text-md'
        >
          <MenuIcon className='rotate-90' />
        </button>
      </div>
      <ul className='flex flex-col p-8 gap-12'>
        {navigationItems?.map((link) => (
          <li key={link.id}>
            <Link
              href={link.link}
              className={`w-fit text-light text-lg font-medium font-minecraft uppercase tracking-widest ${
                router.pathname === link.link ||
                (router.pathname.includes('projects') &&
                  link.link === '/projects')
                  ? '!text-blue opacity-100'
                  : 'opacity-70 hover:opacity-100'
              }`}
            >
              {translate.navigation[link.text]}
            </Link>
          </li>
        ))}

        <div className='h-0.5 w-full bg-light opacity-70 my-4'></div>

        <div className='flex justify-between'>
          <li>
            <a
              href='https://github.com/val2cak'
              target='_blank'
              rel='noopener noreferrer'
            >
              <GithubIcon className='text-lg text-light opacity-70 hover:opacity-100' />
            </a>
          </li>
          <li>
            <a
              href='https://www.linkedin.com/in/valentina-tucak-4b5476132/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <LinkedinIcon className='text-lg text-light opacity-70 hover:opacity-100' />
            </a>
          </li>
          <li>
            <a
              href='https://wa.link/1vlmin'
              target='_blank'
              rel='noopener noreferrer'
            >
              <WhatsappIcon className='text-lg text-light opacity-70 hover:opacity-100' />
            </a>
          </li>
          <li>
            <a
              href='https://www.instagram.com/val2cak/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <InstagramIcon className='text-lg text-light opacity-70 hover:opacity-100' />
            </a>
          </li>
          <li>
            <a
              href={contentfulResumeUrl}
              download='CV_ValentinaTucak.pdf'
              target='_blank'
              rel='noopener noreferrer'
              title='Download CV'
            >
              <ResumeIcon className='text-lg text-light opacity-70 hover:opacity-100' />
            </a>
          </li>
          <LanguageDropdown
            onSelect={(item: Language) => {
              setLocaleToStorage(item.locale);
              setCurrentLanguage(item.locale);
              window.location.reload();
            }}
            items={languages}
            selectedItem={languages.find(
              (lang) => lang.locale === currentLanguage
            )}
            size={'w-7 h-6'}
          />
        </div>
      </ul>
    </main>
  );
};

export default BurgerNavigation;
