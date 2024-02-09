import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import {
  HiChevronLeft as LeftArrow,
  HiChevronRight as RightArrow,
} from 'react-icons/hi2';

import { getBlogPosts } from '../../services/contentful-service';
import Layout from '../layout';

const Projects = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const [numProjectsToShow, setNumProjectsToShow] = useState(3);

  const Project = dynamic(() => import('./components/project'), {
    ssr: false,
  });

  const nextPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setNumProjectsToShow(1);
      } else {
        setNumProjectsToShow(3);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout>
      <div className='py-8 flex items-center gap-4 w-full h-full'>
        <div className='relative w-full h-full flex justify-center items-center'>
          <div className='absolute left-0 cursor-pointer' onClick={prevPost}>
            <LeftArrow className='sm:text-4xl text-5xl text-yellow hover:scale-105 hover:text-blue' />
          </div>
          <div className='overflow-hidden relative h-full flex justify-center sm:py-8 py-24'>
            <div className='flex gap-16 p-2'>
              {posts
                .slice(currentPostIndex, currentPostIndex + numProjectsToShow)
                .map((post) => (
                  <div key={post.sys.id}>
                    <Project
                      name={post.fields.name}
                      year={post.fields.year}
                      imgUrl={post.fields.image.fields.file.url}
                      imgDescription={post.fields.image.fields.description}
                      shortDescription={post.fields.shortDescription}
                      tags={post.fields.tags}
                      slug={post.fields.slug}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div
            className='absolute right-0 cursor-pointer hover:scale-105'
            onClick={nextPost}
          >
            <RightArrow className='sm:text-4xl text-5xl text-yellow hover:scale-105 hover:text-blue' />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps() {
  const posts = await getBlogPosts();

  return {
    props: { posts },
  };
}

export default Projects;
