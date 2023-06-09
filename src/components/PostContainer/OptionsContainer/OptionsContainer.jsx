import { AiFillDelete, AiOutlineEdit } from 'react-icons/ai';
import axios from 'axios';
import { useContext, useState } from 'react';
import {
  BackButton, ButtonContainer, ConfirmButton, DeleteModal, IconsContainer,
} from './optionsStyles';
import LoaderSpinner from '../LoaderSpinner/LoaderSpinner';
import { UserContext } from '../../../context/userContext';

export default function OptionsContainer({
  userId, waiting, setWaiting, postId, getPosts, editDesc, setEditDesc, repostUserId,
}) {
  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('linkr_token'));
  const [modalOpen, setModalOpen] = useState(false);

  function deletePost(id) {
    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    setWaiting(true);
    axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`, config)
      .then(() => {
        setWaiting(false);
        setModalOpen(false);
        getPosts();
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
    <>
      <IconsContainer userLogged={userData.id} owner={userId} repostUserId={repostUserId}>
        <AiOutlineEdit data-test="edit-btn" onClick={editPost} />
        <AiFillDelete data-test="delete-btn" onClick={handleOpenModal} />
      </IconsContainer>
      <DeleteModal
        isOpen={modalOpen}
        style={{
          overlay: {
            zIndex: '3',
          },
        }}
      >
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
    </>
  );
}
