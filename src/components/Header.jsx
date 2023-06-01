import { useContext, useEffect, useState } from 'react';
import {
  DesktopHeaderContainer,
  MobileHeaderContainer,
  HeaderLogo,
  SearchBar,
  SearchInput,
  SearchButton,
  InteractiveButton,
  UserImg,
  MobileLogoContainer,
  SearchBarContainer,
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

  if (viewWindow <= 768) {
    return (
      <MobileHeaderContainer>
        <MobileLogoContainer>
          <HeaderLogo>linkr</HeaderLogo>
          <InteractiveButton type="button" onClick={openOptions}>
            <ArrowDown modalIsOpen={openModal} />
            <UserImg src={userData.photo} />
          </InteractiveButton>
        </MobileLogoContainer>
        <SearchBarContainer>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search for people"
            />
            <SearchButton><SearchIcon /></SearchButton>
          </SearchBar>
        </SearchBarContainer>
        <Menu openModal={openModal} setOpenModal={setOpenModal} anchorEl={anchorEl} />
      </MobileHeaderContainer>
    );
  }

  return (
    <DesktopHeaderContainer>
      <HeaderLogo>linkr</HeaderLogo>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search for people"
        />
        <SearchButton><SearchIcon /></SearchButton>
      </SearchBar>
      <InteractiveButton type="button" onClick={openOptions}>
        <ArrowDown modalIsOpen={openModal} />
        <UserImg src={userData.photo} />
      </InteractiveButton>
      <Menu openModal={openModal} setOpenModal={setOpenModal} anchorEl={anchorEl} />
    </DesktopHeaderContainer>
  );
}
