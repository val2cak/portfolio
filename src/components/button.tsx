import { FC, MouseEventHandler } from 'react';

interface Props {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  handleOnClick?: MouseEventHandler;
  className?: string;
}

const Button: FC<Props> = ({ text, type, handleOnClick, className }) => {
  return (
    <button
      onClick={handleOnClick}
      type={type ?? 'button'}
      className={`flex sm:px-4 px-7 py-3 justify-center items-center gap-2.5 rounded-sm border-2 border-solid border-light text-light hover:border-secondary hover:text-secondary uppercase text-base font-minecraft font-bold tracking-widest ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
