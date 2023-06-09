import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import {
  ModalBox, LogoutButton, MenuContainer, ProfileButton,
} from './menuStyles.js';
import useLogout from '../../hooks/useLogout.js';
import { UserContext } from '../../context/userContext.jsx';

export default function Menu({ modalIsOpen, handleModal }) {
  const { handleLogout: setLogout } = useLogout();
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);
  return (
    <ModalBox
      isOpen={modalIsOpen}
      onRequestClose={handleModal}
      style={{
        overlay: {
          backgroundColor: 'transparent',
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          zIndex: '10',
        },
      }}
    >
      <MenuContainer data-test="menu">
        <ProfileButton onClick={() => navigate(`/user/${userData.id}`)}>Profile</ProfileButton>
        <LogoutButton
          type="button"
          onClick={() => setLogout(true)}
          data-test="logout"
        >
          Logout

        </LogoutButton>
      </MenuContainer>
    </ModalBox>
  );
}
