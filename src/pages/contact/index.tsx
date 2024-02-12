import { VscGithub as GithubIcon } from 'react-icons/vsc';
import {
  BsLinkedin as LinkedinIcon,
  BsInstagram as InstagramIcon,
} from 'react-icons/bs';
import { IoLogoWhatsapp as WhatsappIcon } from 'react-icons/io';

import Layout from '../layout';
import Form from './components/form';
import en from '../../locales/en';

const Contact = () => {
  const { findMeOn, github, instagram, linkedin, whatsapp } = en.contact;

  return (
    <Layout>
      <div className='h-full sm:py-0 py-12 flex sm:flex-col justify-center sm:gap-4 gap-12'>
        <Form />

        <div className='sm:py-4 sm:pb-32 py-12 flex flex-col sm:gap-6 gap-10 sm:px-8'>
          <span className='font-minecraft uppercase text-yellow text-lg tracking-wider'>
            {findMeOn}
          </span>

          <a
            href='https://www.linkedin.com/in/valentina-tucak-4b5476132/'
            target='_blank'
            rel='noopener noreferrer'
            className='opacity-80 hover:opacity-100 flex items-center gap-3 uppercase font-minecraft text-md text-blue'
          >
            <LinkedinIcon />
            <span className='pt-2 tracking-wider'>{linkedin}</span>
          </a>
          <a
            href='https://github.com/val2cak'
            target='_blank'
            rel='noopener noreferrer'
            className='opacity-80 hover:opacity-100 flex items-center gap-3 uppercase font-minecraft text-md text-purple'
          >
            <GithubIcon /> <span className='pt-2 tracking-wider'>{github}</span>
          </a>
          <a
            href='https://www.instagram.com/val2cak/'
            target='_blank'
            rel='noopener noreferrer'
            className='opacity-80 hover:opacity-100 flex items-center gap-3 uppercase font-minecraft text-md text-orange'
          >
            <InstagramIcon />
            <span className='pt-2 tracking-wider'>{instagram}</span>
          </a>
          <a
            href='https://wa.link/1vlmin'
            target='_blank'
            rel='noopener noreferrer'
            className='opacity-80 hover:opacity-100 flex items-center gap-3 uppercase font-minecraft text-md text-green'
          >
            <WhatsappIcon />
            <span className='pt-2 tracking-wider'>{whatsapp}</span>
          </a>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
