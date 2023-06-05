import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderLogo,
  SearchBar,
  MenuButton,
  UserImg,
  ArrowDown,
} from './headerStyles.js';
import Searchinput from '../Search/Search.jsx';
import { UserContext } from '../../context/userContext.jsx';
import Menu from '../Menu/Menu.jsx';

export default function Header() {
  const { userData } = useContext(UserContext);
  const [modalIsOpen, setOpenModal] = useState(false);
  const navigate = useNavigate();

  function handleModal(e) {
    const target = e.target.getAttribute('data-name');

    if (!modalIsOpen && (target === 'avatar' || target === 'arrow')) {
      return setOpenModal(true);
    }

    return setOpenModal(false);
  }

  useEffect(() => {
    if (!userData) {
      navigate('/');
      setTimeout(() => {
        alert('Make login!');
      }, 500);
    }
  }, []);

  return (
    <HeaderContainer onClick={handleModal}>
      <HeaderLogo onClick={() => navigate('/timeline')}>linkr</HeaderLogo>
      <SearchBar>
        <Searchinput />
      </SearchBar>
      <MenuButton type="button" onClick={handleModal}>
        <ArrowDown open={modalIsOpen} data-name="arrow" />
        <UserImg src={userData?.photo} data-test="avatar" data-name="avatar" />
      </MenuButton>
      <Menu
        onClick={handleModal}
        modalIsOpen={modalIsOpen}
        handleModal={handleModal}
      />
    </HeaderContainer>
  );
}
