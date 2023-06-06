import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Tooltip } from 'react-tooltip';
import { useContext, useState } from 'react';
import axios from 'axios';
import { Content } from './LikesContainerStyles';
import { UserContext } from '../../../context/userContext';
import buildTip from '../../../helpers/buildTip';

export default function LikesContainer({
  likedUsers, likeCount, userLikedPost, postId, waiting, setWaiting,
}) {
  const { userData } = useContext(UserContext);
  const [liked, setLiked] = useState(userLikedPost);
  const [likes, setLikes] = useState(likeCount);
  const [usersLiked, setUsersLiked] = useState(likedUsers);
  const [likesInfo, setLikesInfo] = useState(buildTip(usersLiked, userData.name));
  const token = JSON.parse(localStorage.getItem('linkr_token'));

  function likePost(id) {
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    if (!waiting) {
      const users = usersLiked ? [...usersLiked] : [];
      users.push(userData.name);
      setUsersLiked(users);
      setWaiting(true);
      setLiked(true);
      setLikes(Number(likes) + 1);
      setLikesInfo(buildTip(users, userData.name));
      axios.post(`${process.env.REACT_APP_API_URL}/likes/posts/${id}`, {}, config)
        .then(() => {
          setWaiting(false);
          alert('liked');
        })
        .catch((err) => {
          setWaiting(false);
          setLiked(false);
          setLikes(likes - 1);
        });
    }
  }
  function unlikePost(id) {
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    if (!waiting) {
      const users = usersLiked.filter((u) => u !== userData.name);
      setUsersLiked(users);
      setWaiting(true);
      setLiked(false);
      setLikes(Number(likes) - 1);
      setLikesInfo(buildTip(users, userData.name));
      console.log(buildTip(users, userData.name));
      axios.delete(`${process.env.REACT_APP_API_URL}/likes/posts/${id}`, config)
        .then(() => {
          setWaiting(false);
          alert('unliked');
        })
        .catch((err) => {
          setWaiting(false);
          setLiked(true);
          setLikes(Number(likes) + 1);
        });
    }
  }
  return (
    <Content like={liked.toString()}>
      {
          liked
            ? <AiFillHeart data-test="like-btn" onClick={() => unlikePost(postId)} />
            : <AiOutlineHeart data-test="like-btn" onClick={() => likePost(postId)} />
        }
      <p
        data-test="counter"
        data-tooltip-id="my-tooltip"
        data-tooltip-content={
            likes > 2
              ? `${likesInfo} ${(likes - 2 === 1) ? 'e outra pessoa' : `e outras ${likes - 2} pessoas`}`
              : `${likesInfo.replace(',', ' e')}`
          }
        data-tooltip-place="bottom"
        data-tooltip-variant="light"
      >
        {
            (Number(likes) !== 1)
              ? `${likes} likes`
              : `${likes} like`
          }
      </p>
      <Tooltip data-test="tooltip" id="my-tooltip" />
    </Content>
  );
}
