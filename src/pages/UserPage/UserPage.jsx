import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import PostContainer from '../../components/PostContainer/PostContainer.jsx';
import {
  Container, Title, Content, PostsArea, Timeline,
} from './userPageStyle';

export default function TimelinePage() {
  const [postList, setListPost] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('linkr_token'));
    if (userData) {
      const config = {
        headers: {
          userId: userData.id,
          Authorization: `Bearer ${token}`,
        },
      };
      (async () => {
        try {
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts/user/:id}`, config);
          setListPost(data);
        } catch (err) {
          console.log(err?.response?.data);
        }
      })();
    }
  }, []);

  useEffect(() => {
    const handleSize = () => {
      setWindowWidth(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  console.log(postList);
  return (
    <>
      <Header />
      <Container>
        <Title>timeline</Title>
        <Content>
          <PostsArea margin={windowWidth}>
            <Timeline>
              {postList?.map((item) => (
                <PostContainer item={item} key={item.post_id} />
              ))}
              ...
            </Timeline>
          </PostsArea>
          {windowWidth && <Sidebar />}
        </Content>
      </Container>

    </>
  );
}
