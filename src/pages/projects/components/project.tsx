import { FC } from 'react';
import Link from 'next/link';

interface Props {
  name: string;
  year: string;
  imgUrl: string;
  imgDescription: string;
  shortDescription: string;
  tags: string[];
  slug: string;
}

const Project: FC<Props> = ({
  name,
  year,
  imgUrl,
  imgDescription,
  shortDescription,
  tags,
  slug,
}) => {
  return (
    <Link
      href={`projects/${slug}`}
      className={`flex flex-col gap-2 border-2 border-yellow rounded-sm h-full sm:w-64 w-80 hover:border-blue text-yellow hover:text-blue hover:scale-105`}
    >
      <img
        src={imgUrl}
        alt={imgDescription}
        className='rounded-sm h-48 w-full object-cover'
      />

      <div className='border-b border-b-light pb-2 px-4 flex gap-1 text-light text-xs flex-wrap opacity-80'>
        {tags?.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </div>

      <div className='px-4 py-2'>
        <h2 className='text-base font-minecraft'>{name}</h2>
        <p className='text-light text-sm font-minecraft'>{year}</p>
      </div>

      <span className='text-light text-sm px-4 opacity-80'>
        {shortDescription}
      </span>
    </Link>
  );
};

export default Project;
