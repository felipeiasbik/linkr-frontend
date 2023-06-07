import { AiOutlineComment } from 'react-icons/ai';
import { Content } from './commentsStyles';

export default function Comments({ showComments, setShowComments }) {
  return (
    <Content>
      <AiOutlineComment onClick={() => setShowComments(!showComments)} />
      <p>99 comments</p>
    </Content>
  );
}
