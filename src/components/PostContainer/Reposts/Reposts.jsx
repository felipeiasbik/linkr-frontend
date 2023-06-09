import { BiRepost } from 'react-icons/bi';
import { useContext, useState } from 'react';
import axios from 'axios';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner.jsx';
import {
  Content,
  BackButton, ButtonContainer, ConfirmButton, RepostNow,
} from './repostsStyle.js';
import { UserContext } from '../../../context/userContext.jsx';

export default function Reposts({
  postId, repostCount, waiting, setWaiting, getPosts,
}) {
  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('linkr_token'));
  const [modalOpen, setModalOpen] = useState(false);

  function rePost(id) {
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    setWaiting(true);
    const body = { postId: Number(id) };
    axios.post(`${process.env.REACT_APP_API_URL}/repost`, body, config)
      .then(() => {
        setWaiting(false);
        setModalOpen(false);
        getPosts();
      })
      .catch((err) => {
        alert(err.message);
        setModalOpen(false);
        setWaiting(false);
      });
  }
  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Content>
        <BiRepost data-test="repost-btn" onClick={handleOpenModal} />
        <p data-test="repost-counter">
          {repostCount}
          {' '}
          re-posts
        </p>
      </Content>
      <RepostNow
        isOpen={modalOpen}
        style={{
          overlay: {
            zIndex: '3',
          },
        }}
      >
        <p>Do you want to re-post this link?</p>
        <ButtonContainer>
          <BackButton data-test="cancel" disabled={waiting} type="button" onClick={handleCloseModal}>
            No, cancel
          </BackButton>
          <ConfirmButton data-test="confirm" disabled={waiting} type="button" onClick={() => rePost(postId)}>
            {
              waiting
                ? <LoaderSpinner />
                : 'Yes, share!'
            }
          </ConfirmButton>
        </ButtonContainer>
      </RepostNow>
    </>
  );
}
