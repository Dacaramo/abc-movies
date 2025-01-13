'use client';

import { useRouter } from 'next/navigation';
import { FC, FormEvent, useRef } from 'react';

interface Props {
  placeholder?: string;
}

const SearchBar: FC<Props> = ({ placeholder = 'Search' }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleClickOnSubmit = (e: FormEvent) => {
    e.preventDefault();

    const query = inputRef.current?.value.trim();

    if (query) {
      const encodedQuery = encodeURIComponent(query);
      router.replace(`/movies?query=${encodedQuery}#title`);
    }
  };

  return (
    <form
      className='join w-full'
      onSubmit={handleClickOnSubmit}
    >
      <input
        ref={inputRef}
        className='join-item w-full input input-sm focus:outline-none  focus:border-primary bg-neutral-content transition-all duration-100'
        placeholder={placeholder}
      />
      <button
        type='submit'
        className='join-item btn btn-sm btn-primary rounded-r-full'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 16 16'
          fill='currentColor'
          className='h-4 w-4 opacity-70'
        >
          <path
            fillRule='evenodd'
            d='M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z'
            clipRule='evenodd'
          />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;
