import { VscGithub as GithubIcon } from 'react-icons/vsc';
import {
  BsLinkedin as LinkedinIcon
} from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useState } from 'react';
import dynamic from 'next/dynamic';

import Loader from '../../components/loader';
import { translate } from '../../locales/translate';

const Layout = dynamic(() => import('../layout'), {
  ssr: false,
});
const Form = dynamic(() => import('./components/form'), {
  ssr: false,
});

const Contact = () => {
  const { findMeOn, github, linkedin } = translate.contact;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleIsSubmittingChange = (value) => {
    setIsSubmitting(value);
  };

  return (
    <>
      {isSubmitting && <Loader />}

      <Layout>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='h-full sm:py-0 py-12 flex sm:flex-col justify-center sm:gap-4 gap-12'
        >
          <Form onIsSubmittingChange={handleIsSubmittingChange} />

          <div className='sm:py-4 sm:pb-24 py-12 flex flex-col sm:gap-6 gap-10 sm:px-8'>
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
              <GithubIcon />
              <span className='pt-2 tracking-wider'>{github}</span>
            </a>
          </div>
        </motion.div>
      </Layout>
    </>
  );
};

export default Contact;
