import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  HeaderContainer,
  HeaderLogo,
  SearchBar,
  SearchInput,
  MenuButton,
  UserImg,
  ArrowDown,
  SearchIcon,
} from '../styles/headerStyles.js';
import { UserContext } from '../context/userContext.jsx';
import Menu from './Menu.jsx';

export default function Header() {
  const { userData } = useContext(UserContext);
  const [viewWindow, setViewWindow] = useState(window.innerWidth);
  const [openModal, setOpenModal] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  function handleResize() {
    setViewWindow(window.innerWidth);
  }

  function openOptions(e) {
    setOpenModal(true);
    setAnchorEl(e.target);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <HeaderContainer>
      <HeaderLogo onClick={() => navigate('/timeline')}>linkr</HeaderLogo>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder={viewWindow <= 768 ? 'Search for people and friends' : 'Search for people'}
        />
        <SearchIcon />
      </SearchBar>
      <MenuButton type="button" onClick={openOptions}>
        <ArrowDown modalIsOpen={openModal} />
        <UserImg src={userData.photo} />
      </MenuButton>
      <Menu openModal={openModal} setOpenModal={setOpenModal} anchorEl={anchorEl} />
    </HeaderContainer>
  );
}
