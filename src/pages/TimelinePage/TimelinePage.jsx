import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/userContext.jsx';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import PostContainer from '../../components/PostContainer/PostContainer.jsx';
import CreatePostArea from './CreatePostArea/CreatePostArea.jsx';
import {
  Container, Title, Content, PostsArea, Timeline,
} from './timelinePageStyle.js';

export default function TimelinePage() {
  const [postList, setPostList] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);
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
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, config);
          setPostList(data);
          console.log('temo aki');
        } catch (err) {
          console.log(err?.response?.data);
        } finally {
          setIsLoading(false);
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

  return (
    <>
      <Header />
      <Container>
        <Title>timeline</Title>
        <Content>
          <PostsArea margin={windowWidth}>
            <CreatePostArea userData={userData} />
            <Timeline>
              {isLoading && (
                <h3>
                  Loading posts...
                </h3>
              )}
              {!postList && !isLoading && (
              <h3>
                An error occured while trying to fetch the posts, please refresh the page
              </h3>
              )}

              {!isLoading && postList && postList.length > 0 && (
                postList?.map((item) => (
                  <PostContainer item={item} key={item.post_id} />
                )))}
              {!isLoading && postList && postList.length === 0 && (
                <h3>There are no posts yet</h3>
              )}
            </Timeline>
          </PostsArea>
          {windowWidth && <Sidebar />}
        </Content>
      </Container>

    </>
  );
}
