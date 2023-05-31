import styled from 'styled-components';
import colors from '../constants/colors.js';
import fonts from '../constants/fonts.js';

export const SidePageLogoContainer = styled.div`
  position: fixed;
  background-color: ${colors.secondary};
  box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);
  width: 60vw;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  @media (max-width: 768px){
    height: 30%;
    width: 100%;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.secondary};
  }
`;

export const Logo = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  height: 75vh;
  margin-left: 12%;
  @media (max-width: 768px){
    margin: 0%;
    justify-content: center;
    align-items: center;
    height: 70%;
    width: 65%;
    background-color: ${colors.secondary};
  }
`;

export const LogoTitle = styled.h1`
  font-family:${fonts.logo} ;
  font-style: normal;
  font-weight: 700;
  font-size: 106px;
  line-height: 117px;
  letter-spacing: 0.05em;
  @media (max-width: 768px){
    font-style: normal;
    font-weight: 700;
    font-size: 76px;
    line-height: 50px;
    letter-spacing: 0.05em;
  }
`;

export const LogoMessage = styled.p`
  font-family:${fonts.main} ;
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  @media (max-width: 768px){
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 30px;
    text-align: center;
  }
`;
