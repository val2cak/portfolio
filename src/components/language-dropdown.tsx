import { FC, useEffect, useRef, useState } from 'react';

import { Language } from '../types/language';

interface Props {
  onSelect: (item: Language | any) => void;
  items: Language[];
  selectedItem?: Language | undefined;
}

const LanguageDropdown: FC<Props> = ({ items, onSelect, selectedItem }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelect = (item: Language) => {
    onSelect(item);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [ref]);

  return (
    <div
      ref={ref}
      className='z-40 relative place-content-center'
      title='Language'
      onClick={(e) => e.stopPropagation()}
    >
      <div
        onClick={() => setOpen(!open)}
        className='flex items-center hover:cursor-pointer gap-1'
      >
        {selectedItem && <img src={selectedItem.icon} className='w-6 h-5' />}
      </div>

      <div
        className={`${
          open ? 'block' : 'hidden'
        } absolute hover:cursor-pointer w-full pt-2`}
      >
        {items?.map((item) => (
          <div
            key={item.id}
            onClick={() => selectedItem !== item && handleSelect(item)}
            className={`${
              selectedItem === item ? 'opacity-70' : 'hover:opacity-70'
            } pt-2`}
          >
            <p className='flex items-center gap-2 sm:flex-row-reverse'>
              <img src={item.icon} className='w-6 h-5' /> {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageDropdown;
