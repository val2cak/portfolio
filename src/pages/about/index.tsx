import { translate } from '../../locales/translate';
import Layout from '../layout';
import Card from './components/card';
import aboutMeIcon from '../../../public/icons/about-me.svg';
import educationIcon from '../../../public/icons/education.svg';
import hobbiesIcon from '../../../public/icons/hobbies.svg';
import skillsIcon from '../../../public/icons/skills.svg';

const About = () => {
  const { aboutMe, hobbies, education, skills } = translate.about;

  return (
    <Layout>
      <div className='flex sm:flex-col gap-5 pb-8'>
        <div className='flex flex-col gap-5 sm:w-full w-1/2'>
          <Card
            title={aboutMe.title}
            text={aboutMe.text}
            icon={aboutMeIcon.src}
            className='border-yellow text-yellow'
          />

          <Card
            title={skills.title}
            text={skills.text}
            icon={skillsIcon.src}
            className='border-purple text-purple'
          />
        </div>
        <div className='flex flex-col gap-5 sm:w-full w-1/2'>
          <Card
            title={education.title}
            text={education.text}
            icon={educationIcon.src}
            className='border-blue text-blue'
          />

          <Card
            title={hobbies.title}
            text={hobbies.text}
            icon={hobbiesIcon.src}
            className='border-orange text-orange'
          />
        </div>
      </div>
    </Layout>
  );
};

export default About;
