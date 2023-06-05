/* eslint-disable jsx-quotes */
import reactStringReplace from 'react-string-replace';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import {
  LinkIds, Posts, InfoLeft, InfoRight, Articles,
} from './postContainerStyle.js';
import { UserContext } from '../../context/userContext.jsx';

export default function PostContainer({ item, handleLinkClick }) {
  const {
    post_id: postId,
    url,
    description,
    name,
    photo,
    created_at: createdAt,
    userLikedPost,
    likeCount,
    likedUsers,
  } = item;
  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('linkr_token'));
  const [liked, setLiked] = useState(userLikedPost);
  const [likes, setLikes] = useState(likeCount);
  const [usersLiked, setUsersLiked] = useState(likedUsers);
  const [waiting, setWaiting] = useState(false);

  function buildTip(users) {
    if (!users) return 'Ninguém curtiu';
    const user = users.find((u) => u === userData.name);
    if (user) {
      const user2 = users.find((u) => u !== userData.name);
      const info = [];
      info.push(user);
      if (user2) info.push(user2);
      return `${info.join(', ').replace(userData.name, 'Você')}`;
    }
    const info = users.slice(-2);
    return `${info.join(', ')}`;
  }
  const [likesInfo, setLikesInfo] = useState(buildTip(usersLiked));

  function likePost(id) {
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    if (!waiting) {
      const users = [...usersLiked];
      users.push(userData.name);
      setUsersLiked(users);
      setWaiting(true);
      setLiked(true);
      setLikes(Number(likes) + 1);
      setLikesInfo(buildTip(users));
      axios.post(`${process.env.REACT_APP_API_URL}/likes/posts/${id}`, {}, config)
        .then(() => {
          alert('curtido');
          setWaiting(false);
        })
        .catch((err) => {
          console.log(err);
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
      setLikesInfo(buildTip(users));
      axios.delete(`${process.env.REACT_APP_API_URL}/likes/posts/${id}`, config)
        .then(() => {
          alert('descurtido');
          setWaiting(false);
        })
        .catch((err) => {
          console.log(err);
          setWaiting(false);
          setLiked(true);
          setLikes(likes + 1);
        });
    }
  }
  return (
    <Posts data-test="post">
      <InfoLeft like={liked.toString()}>
        <img alt={name} src={photo} />
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
              ? `${likesInfo} e outras ${likes - 2}`
              : `${likesInfo.replace(',', ' e')}`
          }
          data-tooltip-place='bottom'
          data-tooltip-variant='light'
        >
          {
            (likes !== 1)
              ? `${likes} likes`
              : `${likes} like`
          }
        </p>
        <Tooltip data-test="tooltip" id="my-tooltip" />
      </InfoLeft>
      <InfoRight>
        <h2>{name}</h2>
        <p>
          {reactStringReplace(description, /(#\w+)/g, (match, i) => (
            <LinkIds
              to={`/hashtag/${match.slice(1)}`}
              key={i}
              onClick={() => handleLinkClick(match)}
            >
              <span>{match}</span>
            </LinkIds>
          ))}
        </p>
        <Articles>
          {url}
        </Articles>
      </InfoRight>
    </Posts>
  );
}
