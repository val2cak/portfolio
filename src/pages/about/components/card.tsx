import { FC } from 'react';

interface Props {
  title: string;
  text: string;
  icon: string;
  className: string;
}

const Card: FC<Props> = ({ title, text, icon, className }) => {
  return (
    <div
      className={`flex flex-col gap-4 sm:px-8 px-16 sm:py-4 py-9 border-2 border-solid rounded-sm ${className}`}
    >
      <div className='flex gap-4 items-center'>
        <img src={icon} alt={title} className='w-6' />
        <span className='uppercase font-minecraft text-md'>{title}</span>
      </div>

      <span className='text-light text-base'>{text}</span>
    </div>
  );
};

export default Card;
