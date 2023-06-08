import { useNavigate } from 'react-router';
import {
  LinkIds, ResultItem, ResultImage, ResultName, Following,
} from './searchStyles.js';

export function SearchResult({ searchResults, setSearchResults }) {
  const navigate = useNavigate();
  function navigateToUser(id) {
    setSearchResults([]);
    navigate(`/user/${id}`);
  }
  return (
    <>
      {searchResults.map((result) => (
        <ResultItem key={result.id} data-test="user-search" onClick={() => navigateToUser(result.id)}>
          <LinkIds>
            {result.photo && <ResultImage src={result.photo} alt={result.name} />}
            <ResultName>{result.name}</ResultName>
            {result.followingUser && <Following>• following </Following>}
          </LinkIds>
        </ResultItem>
      ))}
    </>
  );
}
