import {
  useContext, useEffect, useState,
} from 'react';
import axios from 'axios';
import CircleLoader from '../LoaderSpinner/CircleLoader';
import {
  BackContainer, CommentsBox, Container, EmptyMessage,
} from './commentsContainerStyles';
import { UserContext } from '../../../context/userContext';
import Comment from './Comment/Comment';
import CommentInput from './CommentInput/CommentInput';

export default function CommentsContainer({
  showComments, postId, userId, comments, setComments,
}) {
  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('linkr_token'));
  const [data, setData] = useState(undefined);
  const [message, setMessage] = useState(false);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    if (showComments) {
      axios.get(`${process.env.REACT_APP_API_URL}/comments/posts/${postId}`, config)
        .then((response) => {
          if (response.data.length === 0) {
            setMessage(true);
          } else setMessage(false);
          setComments(response.data.length);
          setData(response.data);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  }, [showComments, refresh]);
  return (
    <BackContainer showComments={showComments}>
      <CommentsBox data-test="comment-box">
        <Container>
          {
            data
              ? data?.map((d) => <Comment key={d.id} userId={userId} data={d} />)
              : <CircleLoader />
          }
          {message && <EmptyMessage>No comments here!</EmptyMessage>}
        </Container>
        <CommentInput
          photo={userData.photo}
          postId={postId}
          refresh={refresh}
          setRefresh={setRefresh}
          comments={comments}
          setComments={setComments}
        />
      </CommentsBox>
    </BackContainer>
  );
}
