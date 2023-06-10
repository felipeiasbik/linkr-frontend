import { useState } from 'react';

import PostContainer from '../../../components/PostContainer/PostContainer.jsx';

export function ListPosts({ listPosts, refresh, setRefresh }) {
  return (
    <div>
      {listPosts?.map((item) => (
        <PostContainer
          item={item}
          key={item.post_id}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ))}
    </div>
  );
}
