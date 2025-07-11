import { CSSProperties, FC, MouseEventHandler } from 'react';

interface Props {
  text: string;
  type?: 'button' | 'submit' | 'reset';
  handleOnClick?: MouseEventHandler;
  className?: string;
  style?: CSSProperties;
}

const Button: FC<Props> = ({ text, type, handleOnClick, className, style }) => {
  return (
    <button
      onClick={handleOnClick}
      type={type ?? 'button'}
      className={`flex sm:px-4 px-6 py-2 justify-center items-center gap-2.5 rounded-sm border-2 border-solid border-light text-light uppercase text-base font-minecraft font-bold tracking-widest hover:opacity-90 ${className}`}
      style={style}
    >
      {text}
    </button>
  );
};

export default Button;
