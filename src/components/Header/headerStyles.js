import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import fonts from '../../constants/fonts.js';
import colors from '../../constants/colors.js';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  height: 72px;
  background-color: ${colors.secondary};
  padding: 7px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const SearchBarContainer = styled.div`
  background-color: ${colors.main};
  width: 100%;
  height: 50%;
  padding: 7px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const HeaderLogo = styled.h1`
  font-family: ${fonts.logo};
  font-style: normal;
  font-weight: 700;
  font-size: 49px;
  line-height: 54px;
  letter-spacing: 0.05em;
  color: ${colors.neutral};
  cursor: pointer;
`;

export const SearchBar = styled.div`
  transition: all;
  width: 563px;
  height: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  @media (max-width: 768px){
    width: 100%;
    height: 80px;
    position: absolute;
    top: 72px;
    background-color: ${colors.main};
    left: 0;
    padding: 15px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  font-family: ${fonts.secondary};
  padding-left: 12px;
  padding-right: 40px;
  &::placeholder{
    color: ${colors.placeholder};
  }
  @media (max-width: 768px){
    height: 60px;
    padding-right: 45px;
  }
`;

export const MenuButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  position: relative;
  background: transparent;
  border: none;
  width: 110px;
`;

export const UserImg = styled.img`
  width: 53px;
  object-fit: cover;
  height: 53px;
  border-radius:50%;
`;

export const ArrowDown = styled(IoIosArrowDown)`
  transform: ${({ open }) => open && ' rotate(180deg)'};
  transition: all .3s;
  font-size: 40px;
  color: ${colors.neutral};
`;

export const SearchIcon = styled(AiOutlineSearch)`
  font-size: 30px;
  color: ${colors.searchIcon};
  position: absolute;
  right: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px){
    right: 30px;
  }
`;
