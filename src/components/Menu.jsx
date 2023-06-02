import { Modal } from '@mui/material';
import { ModalBox, LogoutButton } from '../styles/menuStyles.js';
import useLogout from '../hooks/useLogout.js';

export default function Menu({ openModal, setOpenModal, anchorEl }) {
  const { handleLogout: setLogout } = useLogout();
  return (
    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      anchorEl={anchorEl}
      sx={{
        '& .MuiBackdrop-root': {
          backgroundColor: 'transparent',
        },
      }}
    >
      <ModalBox>
        <LogoutButton type="button" onClick={() => setLogout(true)}>Logout</LogoutButton>
      </ModalBox>
    </Modal>
  );
}
