import { useState } from 'react';

import PostContainer from '../../../components/PostContainer/PostContainer.jsx';

export function ListPosts({ listPosts, refresh, setRefresh }) {
  const [clickedLink, setClickedLink] = useState('');
  const handleLinkClick = (clickedHashtag) => {
    setClickedLink(clickedHashtag);
  };
  return (
    <div>
      {listPosts?.map((item) => (
        <PostContainer
          item={item}
          handleLinkClick={handleLinkClick}
          key={item.post_id}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ))}
    </div>
  );
}
