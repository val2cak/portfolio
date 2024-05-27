import { MdOutlineClose as CloseIcon } from 'react-icons/md';

const Modal = ({ show, onClose, children }) => {
  if (!show) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-dark bg-opacity-50'>
      <div className='bg-dark p-16 rounded shadow-lg relative'>
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
