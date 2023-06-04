import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import {
  Container, Title, Content, PostsArea, CreatePost, Timeline, PostContainer,
} from './timelinePageStyle.js';

export default function TimelinePage() {
  const [postList, setListPost] = useState([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('linkr_token'));
    if (userData) {
      const config = {
        headers: { userId: userData.id, Authorization: `Bearer ${token}` },
      };
      (async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/poss`, config);
          setListPost(data);
        } catch (err) {
          console.log(err?.response?.data);
        }
      })();
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Title>timeline</Title>
        <Content>
          <PostsArea>
            <CreatePost>
              ....
            </CreatePost>
            <Timeline>
              <PostContainer>
                ...
              </PostContainer>
            </Timeline>
          </PostsArea>
          <Sidebar />
        </Content>
      </Container>

    </>
  );
}
