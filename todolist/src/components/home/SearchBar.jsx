import React from 'react'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useRecoilState } from 'recoil';
import searchTextAtom from '../../recoil/searchTextAtom';
import { useEffect } from 'react';

const SearchBar = () => {
  const [inputData, setInputData] = useRecoilState(searchTextAtom);
  useEffect(() => {
    console.log(inputData)
  }, [inputData])
  return (
    <div className='search-container'>
        <input className='search-bar' type="text" placeholder='Search here...' value={inputData} 
        onChange={(e) => setInputData(e.target.value)} />
        <div className='search-icon'> 
            <SearchRoundedIcon fontSize='large' />
        </div>
    </div>
  )
}

export default SearchBar