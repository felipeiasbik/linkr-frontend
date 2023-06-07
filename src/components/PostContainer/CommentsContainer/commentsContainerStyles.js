import styled from 'styled-components';

export const Container = styled.div`
display: ${(props) => (props.showComments ? 'flex' : 'none')};
width: 611px;
height: 300px;
justify-content: center;
align-items: center;
background: #1E1E1E;
border-radius: 16px;
`;
