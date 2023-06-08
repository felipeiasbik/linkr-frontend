import {
  ModalBox, LogoutButton, MenuContainer,
} from './menuStyles.js';
import useLogout from '../../hooks/useLogout.js';

export default function Menu({ modalIsOpen, handleModal }) {
  const { handleLogout: setLogout } = useLogout();
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
