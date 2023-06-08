import { AiOutlineComment } from 'react-icons/ai';
import { Content } from './commentsStyles';

export default function Comments({ comments, showComments, setShowComments }) {
  return (
    <Content>
      <AiOutlineComment onClick={() => setShowComments(!showComments)} />
      <p>
        {comments}
        {' '}
        comments
      </p>
    </Content>
  );
}
