import reactStringReplace from 'react-string-replace';
import {
  LinkIds, Posts, InfoLeft, InfoRight, Articles,
} from './postContainerStyle.js';

export default function PostContainer({ item, handleLinkClick }) {
  const {
    postId, url, description, name, photo, created_at: createdAt,
  } = item;
  return (
    <Posts data-test="post">
      <InfoLeft>
        <img alt={name} src={photo} />
      </InfoLeft>
      <InfoRight>
        <h2>{name}</h2>
        <p>
          {reactStringReplace(description, /(#\w+)/g, (match, i) => (
            <LinkIds
              to={`/hashtag/${match.slice(1)}`}
              key={i}
              onClick={() => handleLinkClick(match)}
            >
              <span>{match}</span>
            </LinkIds>
          ))}
        </p>
        <Articles>
          {url}
        </Articles>
      </InfoRight>
    </Posts>
  );
}
