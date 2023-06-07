import { AiOutlineComment } from 'react-icons/ai';
import { Content } from './commentsStyles';

export default function Comments({ commentCount, showComments, setShowComments }) {
  return (
    <Content>
      <AiOutlineComment onClick={() => setShowComments(!showComments)} />
      <p>
        {commentCount}
        {' '}
        comments
      </p>
    </Content>
  );
}
