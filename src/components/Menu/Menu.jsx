import { Modal } from '@mui/material';
import { ModalBox, LogoutButton } from './menuStyles.js';
import useLogout from '../../hooks/useLogout.js';

export default function Menu({ openModal, setOpenModal }) {
  const { handleLogout: setLogout } = useLogout();
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <ModalBox>
        <LogoutButton type="button" onClick={() => setLogout(true)} data-test="logout">Logout</LogoutButton>
      </ModalBox>
    </Modal>
  );
}
