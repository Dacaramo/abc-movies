import Link from 'next/link';
import { FC } from 'react';
import AuthModal from './AuthModal';

const Header: FC = () => {
  return (
    <nav className='w-full flex flex-row gap-5 justify-start items-center bg-black text-sm px-10 py-5'>
      <Link
        href={'/'}
        className='text-2xl font-bold'
      >
        ABC<span className='text-primary'>movies</span>
      </Link>
      <Link
        href={'/#favorites'}
        className='mr-auto'
      >
        Favorites
      </Link>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <AuthModal />
    </nav>
  );
};

export default Header;
