import reactStringReplace from 'react-string-replace';
import { useState } from 'react';
import {
  LinkIds, Posts, InfoLeft, InfoRight, Articles,
} from '../hashtagStyles.js';

export function ListPosts({ listPosts }) {
  const [clickedLink, setClickedLink] = useState('');
  const handleLinkClick = (clickedHashtag) => {
    setClickedLink(clickedHashtag);
  };
  console.log(listPosts);
  return (
    <div>
      {listPosts?.map(({
        postId, url, description, name, photo, created_at: createdAt,
      }) => (
        <Posts data-test="post" key={createdAt}>
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
      ))}
    </div>
  );
}
