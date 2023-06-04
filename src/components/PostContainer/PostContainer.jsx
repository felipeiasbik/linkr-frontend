import reactStringReplace from 'react-string-replace';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import axios from 'axios';
import { useContext, useState } from 'react';
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
  } = item;
  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('linkr_token'));
  const [liked, setLiked] = useState(userLikedPost);
  const [likes, setLikes] = useState(likeCount);
  const [waiting, setWaiting] = useState(false);

  function likePost(id) {
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    if (!waiting) {
      setWaiting(true);
      setLiked(true);
      setLikes(Number(likes) + 1);
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
      setWaiting(true);
      setLiked(false);
      setLikes(Number(likes) - 1);
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
            ? <AiFillHeart onClick={() => unlikePost(postId)} />
            : <AiOutlineHeart onClick={() => likePost(postId)} />
        }
        <p>
          {
            (likes !== 1)
              ? `${likes} likes`
              : `${likes} likes`
          }
        </p>
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
