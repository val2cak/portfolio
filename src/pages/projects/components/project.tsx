import { FC } from 'react';
import Link from 'next/link';

interface Props {
  name: string;
  year: string;
  imgUrl: string;
  imgDescription: string;
  shortDescription: string;
  tags: string;
  slug: string;
  isMiddlePost: boolean;
}

const Post: FC<Props> = ({
  name,
  year,
  imgUrl,
  imgDescription,
  shortDescription,
  tags,
  slug,
  isMiddlePost,
}) => {
  return (
    <Link
      href={`projects/${slug}`}
      className={`flex flex-col gap-2 border-2 border-yellow rounded-sm h-full w-80 ${
        isMiddlePost ? 'transform scale-110' : 'hover:scale-105'
      }`}
    >
      <img
        src={imgUrl}
        alt={imgDescription}
        className='rounded-sm h-48 w-full object-cover'
      />

      <div className='border-b border-b-light p-2'>{tags}</div>

      <div className='p-2'>
        <h2 className='text-yellow text-base font-minecraft'>{name}</h2>
        <p className='text-light text-sm font-minecraft'>{year}</p>
      </div>

      <span className='text-light text-sm p-2'>{shortDescription}</span>
    </Link>
  );
};

export default Post;
