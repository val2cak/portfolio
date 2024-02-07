import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

import { translate } from '../locales/translate';
import { navigationItems } from '../constants/navigation-items';
import menu from '../../public/icons/menu.svg';
import logo from '../../public/images/logo.png';
import BurgerMenu from './burger-menu';

const Header: FC = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`absolute top-0 left-0 right-0 sm:px-8 px-40 2xl:px-56 py-3.5 z-10 h-14 mt-4 items-center ${
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
          <ul className='flex space-x-8'>
            {navigationItems.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.link}
                  className={`text-light text-sm font-minecraft uppercase font-medium ${
                    router.pathname === link.link ||
                    (router.pathname.includes('projects') &&
                      link.link === '/projects')
                      ? 'text-blue opacity-100'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                >
                  {translate.navigation[link.text]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
