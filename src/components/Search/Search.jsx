/* eslint-disable react/jsx-props-no-spreading, no-unused-vars, no-restricted-syntax */

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { useNavigate } from 'react-router-dom';
import {
  ContentSearch, SearchInput, ResultsContainer, SearchIcon,
} from './searchStyles.js';
import { UserContext } from '../../context/userContext.jsx';
import { SearchResult } from './SearchResult.jsx';

export default function Searchinput() {
  const navigate = useNavigate();
  const [viewWindow, setViewWindow] = useState(window.innerWidth);
  const [searchResults, setSearchResults] = useState([]);
  const { userData } = useContext(UserContext);

  function handleResize() {
    setViewWindow(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleSearch(event) {
    const searchTerm = event.target.value;
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }
    const token = JSON.parse(localStorage.getItem('linkr_token'));
    if (userData) {
      const config = {
        headers: { userId: userData.id, Authorization: `Bearer ${token}` },
      };

      axios.get(`${process.env.REACT_APP_API_URL}/search?name=${searchTerm}`, config)
        .then((res) => {
          const results = res.data;
          setSearchResults(results);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }

  return (
    <ContentSearch>
      <SearchInput
        as={DebounceInput}
        debounceTimeout={300}
        type="text"
        placeholder={viewWindow <= 768 ? 'Search for people and friends' : 'Search for people'}
        onChange={handleSearch}
      />
      {searchResults.length > 0 && (
        <ResultsContainer>
          <SearchResult searchResults={searchResults} />
        </ResultsContainer>
      )}
      <SearchIcon />
    </ContentSearch>
  );
}
