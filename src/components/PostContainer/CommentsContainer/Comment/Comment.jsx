import { useNavigate } from 'react-router-dom';
import { CommentCard, NameContainer, RightContainer } from './commentStyle';

export default function Comment({ data, userId }) {
  const navigate = useNavigate();
  const {
    photo, name, description, followingUser,
  } = data;
  const author = Number(data.user_id) === Number(userId);
  return (
    <CommentCard data-test="comment">
      <img src={photo} onClick={() => navigate(`/user/${userId}`)} />
      <RightContainer>
        <NameContainer>
          <span onClick={() => navigate(`/user/${userId}`)}>{name}</span>
          {author ? <p>• post’s author</p> : <p>{followingUser && '• following'}</p>}
        </NameContainer>
        <p>{description}</p>
      </RightContainer>
    </CommentCard>
  );
}
