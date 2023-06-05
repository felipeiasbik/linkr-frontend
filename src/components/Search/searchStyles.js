import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import fonts from '../../constants/fonts.js';
import colors from '../../constants/colors.js';

export const LinkIds = styled(Link)`
    display: flex;
    align-items:center;
    text-decoration: none;
    color: #ffffff;
    span {
      font-weight: 700;
    }
`;
export const ContentSearch = styled.div`
  width: 100%;
  padding: 0;
position: relative;
`;
export const SearchIcon = styled(AiOutlineSearch)`
  font-size: 30px;
  color: ${colors.searchIcon};
  position: absolute;
  top: 8px;
  right: 10px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  @media (max-width: 768px){  
  top: 15px;
  right: 10px;
  }
`;
export const SearchInput = styled.input`
  width: 563px;
  max-width: 563px;
  height: 45px;
  border-radius: 8px;
  border: none;
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  font-family: ${fonts.secondary};
  padding-left: 12px;
  padding-right: 40px;
  position: relative;
  z-index: 1;
  :focus{
    outline: none;
  }
  &::placeholder{
    color: ${colors.placeholder};
  }
  @media (max-width: 768px){
    width: 100%;
    max-width: 100%;
    height: 60px;
    padding-right: 45px;
  }
`;
export const ResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: -7px;
  background-color: ${colors.resultSearch};
  border-radius: 0 0 8px 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 8px;
  z-index: 0;
  @media (max-width: 768px){
    width: 100%;
    margin: 0 auto;
    margin-top: -6px;
  }
`;
export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  &:hover{
    background-color: aliceblue;
    transition: all .8s;
  }
`;
export const ResultImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
  object-fit: cover;
`;
export const ResultName = styled.div`
  font-weight: 400;
  font-family: ${fonts.main};
  color: ${colors.search};
`;
