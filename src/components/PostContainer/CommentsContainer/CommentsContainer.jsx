import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import CircleLoader from '../LoaderSpinner/CircleLoader';
import {
  BackContainer, CommentsBox, Container, EmptyMessage,
} from './commentsContainerStyles';
import { UserContext } from '../../../context/userContext';
import Comment from './Comment/Comment';

export default function CommentsContainer({ showComments, postId, userId }) {
  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('linkr_token'));
  const [data, setData] = useState(undefined);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    if (showComments) {
      axios.get(`${process.env.REACT_APP_API_URL}/comments/posts/${postId}`, config)
        .then((response) => {
          console.log(response.data);
          if (response.data.length === 0) {
            setMessage(true);
          }
          setData(response.data);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }, [showComments]);
  return (
    <BackContainer showComments={showComments}>
      <CommentsBox>
        <Container>
          {
            data
              ? data?.map((d) => <Comment key={d.id} userId={userId} data={d} />)
              : <CircleLoader />
          }
          {message && <EmptyMessage>No comments here!</EmptyMessage>}
        </Container>
      </CommentsBox>
    </BackContainer>
  );
}
