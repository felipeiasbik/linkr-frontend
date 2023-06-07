import { CommentCard, NameContainer, RightContainer } from './commentStyle';

export default function Comment({ data, userId }) {
  const {
    photo, name, description, followingUser,
  } = data;
  const author = Number(data.user_id) === Number(userId);
  return (
    <CommentCard>
      <img src={photo} />
      <RightContainer>
        <NameContainer>
          <span>{name}</span>
          {author ? <p>• post’s author</p> : <p>{followingUser && '• following'}</p>}
        </NameContainer>
        <p>{description}</p>
      </RightContainer>
    </CommentCard>
  );
}
