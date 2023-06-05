/* eslint-disable spaced-comment */
import reactStringReplace from 'react-string-replace';
import {
  AiFillDelete, AiFillHeart, AiOutlineEdit, AiOutlineHeart,
} from 'react-icons/ai';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';
import { ThreeDots } from 'react-loader-spinner';
import {
  LinkIds, Posts, InfoLeft, InfoRight, Articles, IconsContainer,
  DeleteModal, ButtonContainer, BackButton, ConfirmButton,
} from './postContainerStyle.js';
import { UserContext } from '../../context/userContext.jsx';

export default function PostContainer({
  item, handleLinkClick, refresh, setRefresh,
}) {
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
    user_id: userId,
  } = item;
  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('linkr_token'));
  const [liked, setLiked] = useState(userLikedPost);
  const [likes, setLikes] = useState(likeCount);
  const [usersLiked, setUsersLiked] = useState(likedUsers);
  const [waiting, setWaiting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
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
  function deletePost(id) {
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    setWaiting(true);
    axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, config)
      .then(() => {
        alert('deletado');
        setWaiting(false);
        setModalOpen(false);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
        setWaiting(false);
      });
  }
  function editPost(id) {
    alert(`edit ${id}`);
  }
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Posts data-test="post">
      <IconsContainer userLogged={userData.id} owner={userId}>
        <AiOutlineEdit data-test="edit-btn" onClick={() => editPost(postId)} />
        <AiFillDelete data-test="delete-btn" onClick={handleOpenModal} />
      </IconsContainer>
      <DeleteModal isOpen={modalOpen}>
        <p>Are you sure you want to delete this post?</p>
        <ButtonContainer>
          <BackButton disabled={waiting} type="button" onClick={handleCloseModal}>
            No, go back
          </BackButton>
          <ConfirmButton disabled={waiting} type="button" onClick={() => deletePost(postId)}>
            {waiting ? (
              <ThreeDots
                height="20"
                width="40"
                radius="26"
                color="#FFFFFF"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible
              />
            ) : 'Yes, delete it'}
          </ConfirmButton>
        </ButtonContainer>
      </DeleteModal>
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
              ? `${likesInfo} ${(likes - 2 === 1) ? 'e outra pessoa' : `e outras ${likes - 2} pessoas`}`
              : `${likesInfo.replace(',', ' e')}`
          }
          data-tooltip-place="bottom"
          data-tooltip-variant="light"
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
