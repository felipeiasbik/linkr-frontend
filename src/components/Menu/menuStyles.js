import styled, { keyframes } from 'styled-components';
import ReactModal from 'react-modal';
import colors from '../../constants/colors.js';
import fonts from '../../constants/fonts.js';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalBox = styled(ReactModal)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MenuContainer = styled.div`
  animation: ${fadeIn} .5s ease-in;
  height: 47px;
  width: 180px;
  position: fixed;
  right: 0;
  top: 72px;
  border-radius: 0  0  0 20px;
  background-color: ${colors.modal};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

export const LogoutButton = styled.button`
  background-color: transparent;
  color: ${colors.neutral};
  font-family: ${fonts.main};
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  letter-spacing: 0.05em;
  border: none;
  cursor: pointer;
  &:hover{
    color: lightgray;
  }
`;
