import {
  LinkIds, ResultItem, ResultImage, ResultName, Following,
} from './searchStyles.js';

export function SearchResult({ searchResults, setSearchResults }) {
  return (
    <>
      {searchResults.map((result) => (
        <ResultItem key={result.id}>
          <LinkIds to={`/user/${result.id}`} data-test="user-search" onClick={() => setSearchResults([])}>
            {result.photo && <ResultImage src={result.photo} alt={result.name} />}
            <ResultName>{result.name}</ResultName>
            {result.followingUser && <Following>• following </Following>}
          </LinkIds>
        </ResultItem>
      ))}
    </>
  );
}
