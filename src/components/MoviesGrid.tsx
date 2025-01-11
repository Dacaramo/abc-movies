'use client';

import { useState, ChangeEvent } from 'react';
import SearchBar from './SearchBar';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

const MoviesGrid = ({}) => {
  const [search, setSearch] = useState('');

  // const delay = 300;
  // const debouncedSearch = useDebouncedValue(search, 300);

  const handleChangeOnSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className='flex flex-col gap-2 items-start bg-base-200'>
        <SearchBar
          value={search}
          onChange={handleChangeOnSearch}
        />
      </div>
      <div className='bg-base-100'></div>
    </>
  );
};

export default MoviesGrid;
