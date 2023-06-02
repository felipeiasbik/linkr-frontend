/* eslint-disable react/jsx-props-no-spreading, no-unused-vars, no-restricted-syntax */

import styled from 'styled-components';
import Sidebar from '../components/Sidebar.jsx';

export default function HashtagPage() {
  return (
    <Center>
      <Sidebar />
    </Center>
  );
}
const Center = styled.div`
margin-top: 30px;
display: flex;
justify-content: center;
align-items: center;
`;
