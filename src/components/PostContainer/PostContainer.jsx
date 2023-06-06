import reactStringReplace from 'react-string-replace';
import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';
import {
  useContext, useEffect, useState,
} from 'react';
import { Link } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css';
import {
  LinkIds, Posts, InfoLeft, InfoRight, Articles, IconsContainer,
  DeleteModal, ButtonContainer, BackButton, ConfirmButton,
  MetaDataInfos, MetaDataImage,
} from './postContainerStyle.js';
import { UserContext } from '../../context/userContext.jsx';
import buildTip from '../../helpers/buildTip.js';
import LikesContainer from './LikesContainer/LikesContainer.jsx';
import EditDescription from './EditDescription/EditDescription.jsx';
import LoaderSpinner from './LoaderSpinner/LoaderSpinner.jsx';

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
  const [waiting, setWaiting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [descState, setDescState] = useState(description);
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    axios.get(`https://jsonlink.io/api/extract?url=${url}`)
      .then((res) => {
        setMetaData({
          title: res.data.title,
          description: res.data.description,
          images: res.data.images[0],
          url,
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

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
        alert('Oops, something went wrong. The post was not deleted.');
        setModalOpen(false);
        setWaiting(false);
      });
  }
  function editPost() {
    setEditDesc(!editDesc);
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
        <AiOutlineEdit data-test="edit-btn" onClick={editPost} />
        <AiFillDelete data-test="delete-btn" onClick={handleOpenModal} />
      </IconsContainer>
      <DeleteModal isOpen={modalOpen}>
        <p>Are you sure you want to delete this post?</p>
        <ButtonContainer>
          <BackButton data-test="cancel" disabled={waiting} type="button" onClick={handleCloseModal}>
            No, go back
          </BackButton>
          <ConfirmButton data-test="confirm" disabled={waiting} type="button" onClick={() => deletePost(postId)}>
            {
              waiting
                ? <LoaderSpinner />
                : 'Yes, delete it'
            }
          </ConfirmButton>
        </ButtonContainer>
      </DeleteModal>
      <InfoLeft>
        <Link to={`/user/${item.user_id}`}>
          <img alt={name} src={photo} />
        </Link>
        <LikesContainer
          likedUsers={likedUsers}
          likeCount={likeCount}
          userLikedPost={userLikedPost}
          postId={postId}
          waiting={waiting}
          setWaiting={setWaiting}
        />
      </InfoLeft>
      <InfoRight>
        <div>
          <h2>
            <Link data-test="username" to={`/user/${item.user_id}`}>
              {name}
            </Link>
          </h2>
        </div>
        {
          !editDesc
            ? (
              <p>
                {reactStringReplace(descState, /(#\w+)/g, (match, i) => (
                  <LinkIds
                    to={`/hashtag/${match.slice(1)}`}
                    key={i}
                    onClick={() => handleLinkClick(match)}
                  >
                    <span>{match}</span>
                  </LinkIds>
                ))}
              </p>
            )
            : (
              <EditDescription
                value={descState}
                token={token}
                setEditDesc={setEditDesc}
                postId={postId}
                userData={userData}
                setDescState={setDescState}
              />
            )
        }
        <LinkIds to={url} target="_blank" data-test="link">
          <Articles>
            <MetaDataInfos>
              <h2>{metaData?.title}</h2>
              <p>{metaData?.description}</p>
              <p>{metaData?.url}</p>
            </MetaDataInfos>
            <MetaDataImage><img alt="a" src={metaData?.images} /></MetaDataImage>
          </Articles>
        </LinkIds>
      </InfoRight>
    </Posts>
  );
}
