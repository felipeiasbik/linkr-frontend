import { AiOutlineComment } from 'react-icons/ai';
import { Content } from './commentsStyles';

export default function Comments({ comments, showComments, setShowComments }) {
  return (
    <Content>
      <AiOutlineComment data-test="comment-btn" onClick={() => setShowComments(!showComments)} />
      <p data-test="comment-counter">
        {comments}
        {' '}
        comments
      </p>
    </Content>
  );
}
