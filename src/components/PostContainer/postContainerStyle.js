import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../constants/colors.js';
import fonts from '../../constants/fonts.js';

export const LinkIds = styled(Link)`
    text-decoration: none;
    color: #ffffff;
    span {
      font-weight: 700;
    }
`;
export const Container = styled.div`
padding-top: 53px;
background-color: ${colors.main};
width: 936px;
min-height:100%;
min-height: 100vh;
display: flex;
flex-direction: column;
align-items: flex-start;
margin: 0 auto;
@media (max-width: 768px){
padding-top: 10px;
width: 100%;
  }
`;
export const Title = styled.h1`
color: ${colors.neutral};
font-family: ${fonts.secondary};
font-size: 43px;
font-weight: 700;
display: flex;
justify-content: flex-start;
padding-bottom: 41px;
@media (max-width: 768px){
padding: 0 0 30px 20px;
  }
`;
export const SubContainer = styled.div`
width: 936px;
display: flex;
justify-content: space-between;
@media (max-width: 768px){
width: 100%;
  }
`;
export const Main = styled.div`
width: 611px;
@media (max-width: 768px){
width: 100%;
  }
`;
export const SideBar = styled.div`
display: flex;
align-items: flex-start;
@media (max-width: 768px){
    display: none;
}
`;
export const Posts = styled.div`
background-color: ${colors.modal};
border-radius: 16px;
display: flex;
@media (max-width: 768px){
    border-radius: 0px;
    padding-right: 15px;
  }
`;
export const InfoLeft = styled.div`
width: 70px;
display: flex;
flex-direction: column;
align-items: center;
padding: 17px 17px 17px 34px;
img {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
@media (max-width: 768px){
width: 100%;
padding: 15px;
img {
    width: 40px;
    height: 40px;
}
}
`;
export const InfoRight = styled.div`
width: 540px;
display: flex;
flex-direction: column;
padding: 17px;
font-family: ${fonts.main};
h2{
  display: inline-block;
  margin-bottom: 7px;
a{
  font-size: 19px;
  font-weight: 400;
  color: ${colors.neutral};
  text-decoration: none;
  cursor: pointer;
}
}
p{
font-size: 17px;
font-weight: 400;
line-height: 20px;
color: ${colors.description};
}
@media (max-width: 768px){
    width: 100%;
    padding: 17px 17px 17px 0px;
}
`;
export const Articles = styled.div`
display: flex;
justify-content: space-between;
margin-top: 7px;
width: 502px;
height: 155px;
border: 1px solid #4D4D4D;
border-radius: 11px;
color: ${colors.description};
@media (max-width: 768px){
    width: 272px;
    height: 115px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`;

export const MetaDataInfos = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: flex-start;
width: 350px;
height: 155px;
padding: 20px;
font-family: ${fonts.main};
font-size: 9px;
font-weight: 400;
gap: 13px;
h2 {
font-size: 16px;
line-height: 19px;
margin-top: -8px;
margin-bottom: -8px;
}
p{
font-size: 11px;
line-height: 13px
}
@media (max-width: 768px){
  width: calc(100% - 95px);
  height: 115px;
  padding: 11px;
  h2 {
  font-size: 11px;
  line-height: 13px;
  margin-top: -8px;
  margin-bottom: -8px;
  white-space: pre-line;
  }
  p{
  max-height: 3em;
  font-size: 9px;
  line-height: 11px;
  white-space: pre-line;
  overflow: hidden;
  text-overflow: ellipsis;
  }
}
`;

export const MetaDataImage = styled.div`
display: flex;
justify-content: flex-end;
width: 155px;
height: 153px;
border-radius: 0 11px 11px 0;
img{
background-color: ${colors.neutral};
width: 155px;
height: 153px;
object-fit: cover;
border-radius: 0 11px 11px 0;
@media (max-width: 768px){
  width: 95px;
  height: 115px;
  img{
  width: 95px;
  height: 115px;
  }
}
}
`;
export const PostContent = styled.div`
max-height: 650px;
min-height: 250px;
display: flex;
flex-direction: column;
align-items: center;
position: relative;
margin-bottom: 16px;
`;
