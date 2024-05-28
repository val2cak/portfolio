import { useEffect, useRef } from 'react';
import { MdOutlineClose as CloseIcon } from 'react-icons/md';

const Modal = ({ show, onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  if (!show) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50'>
      <div
        ref={modalRef}
        className='bg-dark px-24 py-8 rounded shadow-lg relative'
      >
        <CloseIcon
          className='absolute top-0 right-0 m-4 text-lg hover:cursor-pointer'
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default Modal;
