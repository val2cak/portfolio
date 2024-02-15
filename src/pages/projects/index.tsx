import { useState } from 'react';
import {
  HiChevronLeft as LeftArrow,
  HiChevronRight as RightArrow,
} from 'react-icons/hi2';

import { getBlogPosts } from '../../services/contentful-service';
import Layout from '../layout';
import Project from './components/project';

const Projects = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

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

  return (
    <Layout>
      <div className='sm:py-0 py-8 flex items-center justify-center gap-4 w-full h-full'>
        <div className='relative w-full flex justify-center items-center'>
          <div
            className='absolute left-0 cursor-pointer hover:scale-105 h-full flex items-center backdrop-blur-xs z-10'
            onClick={prevPost}
          >
            <LeftArrow className='sm:text-2xl text-5xl text-yellow hover:scale-105 sm:hover:text-yellow hover:text-blue' />
          </div>
          <div className='overflow-hidden relative w-full h-full flex justify-center items-center sm:py-2 py-24'>
            <div className='flex gap-16 2xl:gap-20 p-2'>
              {[
                currentPostIndex,
                currentPostIndex + 1,
                currentPostIndex + 2,
              ]?.map((index, idx) => {
                const adjustedIndex =
                  index >= posts.length ? index - posts.length : index;
                const post = posts[adjustedIndex];
                const isMiddlePost = idx === 1;
                return (
                  <div
                    key={post.sys.id}
                    className={
                      isMiddlePost ? 'transform scale-125 sm:scale-105' : ''
                    }
                  >
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
                );
              })}
            </div>
          </div>
          <div
            className='absolute right-0 cursor-pointer hover:scale-105 h-full flex items-center backdrop-blur-xs z-10'
            onClick={nextPost}
          >
            <RightArrow className='sm:text-2xl text-5xl text-yellow hover:scale-105 sm:hover:text-yellow hover:text-blue' />
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
