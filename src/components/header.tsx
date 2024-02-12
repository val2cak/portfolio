import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { VscGithub as GithubIcon } from 'react-icons/vsc';
import {
  BsLinkedin as LinkedinIcon,
  BsInstagram as InstagramIcon,
} from 'react-icons/bs';
import { IoLogoWhatsapp as WhatsappIcon } from 'react-icons/io';

import { navigationItems } from '../constants/navigation-items';
import menu from '../../public/icons/menu.svg';
import logo from '../../public/images/logo.png';
import BurgerMenu from './burger-menu';
import en from '../locales/en';

const Header: FC = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`absolute top-0 left-0 right-0 sm:px-8 lg:px-24 px-40 2xl:px-56 py-3.5 z-30 h-14 mt-4 items-center ${
        isMobileMenuOpen ? 'opacity-95' : 'opacity-100'
      }`}
    >
      <div className='container mx-auto flex items-center justify-between'>
        <Link href='/' className='text-light text-base font-bold uppercase'>
          <img src={logo.src} alt='Logo' className='h-6' />
        </Link>

        <div className='sm:flex hidden'>
          <button
            onClick={toggleMobileMenu}
            className='text-light focus:outline-none'
          >
            <img src={menu.src} alt='Menu' loading='lazy' />
          </button>
        </div>

        {isMobileMenuOpen && (
          <BurgerMenu
            isOpen={isMobileMenuOpen}
            setIsOpen={setMobileMenuOpen}
            navigationItems={navigationItems}
          />
        )}

        <nav className='sm:hidden flex'>
          <ul className='flex lg:space-x-6 space-x-8 items-center'>
            {navigationItems?.map((link) => (
              <li key={link.id} className='pt-1'>
                <Link
                  href={link.link}
                  className={`text-light text-sm 2xl:text-base font-minecraft uppercase font-medium tracking-widest ${
                    router.pathname === link.link ||
                    (router.pathname.includes('projects') &&
                      link.link === '/projects')
                      ? 'text-yellow opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {en.navigation[link.text]}
                </Link>
              </li>
            ))}

            <div className='opacity-70'>|</div>

            <li>
              <a
                href='https://github.com/val2cak'
                target='_blank'
                rel='noopener noreferrer'
              >
                <GithubIcon className='text-base text-light opacity-70 hover:opacity-100' />
              </a>
            </li>
            <li>
              <a
                href='https://www.linkedin.com/in/valentina-tucak-4b5476132/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <LinkedinIcon className='text-base text-light opacity-70 hover:opacity-100' />
              </a>
            </li>
            <li>
              <a
                href='https://wa.link/1vlmin'
                target='_blank'
                rel='noopener noreferrer'
              >
                <WhatsappIcon className='text-base text-light opacity-70 hover:opacity-100' />
              </a>
            </li>
            <li>
              <a
                href='https://www.instagram.com/val2cak/'
                target='_blank'
                rel='noopener noreferrer'
              >
                <InstagramIcon className='text-base text-light opacity-70 hover:opacity-100' />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
