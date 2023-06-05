import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../constants/colors.js';
import fonts from '../../constants/fonts.js';

export const LinkIds = styled(Link)`
    text-decoration: none;
    color: #ffffff;
`;
export const ListTags = styled.div`
display: flex;
flex-direction: column;
background-color: ${colors.modal};
border-radius: 16px;
width: 300px;
height: 380px;
color: #ffffff;
font-weight: 700;
h2 {
font-family: ${fonts.secondary};
font-size: 27px;
padding: 15px 20px 17px 20px;
position: relative;
}
`;
export const Separeted = styled.div`
background-color: ${colors.border};
height: 1px;
font-size: 1px;
width: 300px;
margin-left: -15px;
margin-top: 50px;
position: absolute;
`;
export const TagsContanier = styled.div`
padding: 10px 20px 30px 20px;
border-top: 1px solid #484848;
`;
export const Tags = styled.div`
display: flex;
flex-direction: column;
margin-top: 10px;
font-size: 19px;
font-family: ${fonts.main};
`;
