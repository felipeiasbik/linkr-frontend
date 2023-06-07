import { AiOutlineComment } from 'react-icons/ai';
import { Content } from './commentsStyles';

export default function Comments({ showComments, setShowComments, commentCount }) {
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
