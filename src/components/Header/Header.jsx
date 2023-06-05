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
    <HeaderContainer>
      <HeaderLogo onClick={() => navigate('/timeline')}>linkr</HeaderLogo>
      <SearchBar>
        <Searchinput />
      </SearchBar>
      <MenuButton type="button">
        <ArrowDown open={modalIsOpen} data-name="arrow" onClick={handleModal} />
        <UserImg src={userData?.photo} data-test="avatar" data-name="avatar" onClick={handleModal} />
      </MenuButton>
      <Menu
        modalIsOpen={modalIsOpen}
        handleModal={handleModal}
      />
    </HeaderContainer>
  );
}
