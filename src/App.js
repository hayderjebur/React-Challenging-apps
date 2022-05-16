import React, { useState, useEffect, useCallback } from 'react';
import { fetchData } from './apiCalls';
import { useDebounceFunction } from './Debounce';

function App() {
  const [searchString, setSearchString] = useState('');

  // Debound using Hook
  const debounce = useCallback(
    useDebounceFunction((searchString) => fetchData(searchString), 1000),
    []
  );
  const onChange = (e) => {
    setSearchString(e.target.value);
    debounce(searchString);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  // Debound using useEffect
  useEffect(() => {
    const x = setTimeout(() => {
      fetchData();
    }, 2000);
    return () => clearTimeout(x);
  }, [searchString]);

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input onChange={onChange} value={searchString} />
      </form>
    </>
  );
}

export default App;
