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
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  function openOptions(e) {
    setOpenModal(true);
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
      <MenuButton type="button" onClick={openOptions}>
        <ArrowDown open={openModal} />
        <UserImg src={userData?.photo} data-test="avatar" />
      </MenuButton>
      <Menu
        openModal={openModal}
        setOpenModal={setOpenModal}
        data-test="menu"
      />
    </HeaderContainer>
  );
}
