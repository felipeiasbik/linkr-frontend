import {
  LinkIds, ResultItem, ResultImage, ResultName,
} from './searchStyles.js';

export function SearchResult({ searchResults }) {
  return (
    <>
      {searchResults.map((result) => (
        <ResultItem key={result.id}>
          <LinkIds to={`/user/${result.id}`}>
            {result.photo && <ResultImage src={result.photo} alt={result.name} />}
            <ResultName>{result.name}</ResultName>
          </LinkIds>
        </ResultItem>
      ))}
    </>
  );
}
