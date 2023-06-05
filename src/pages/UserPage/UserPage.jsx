import { useParams } from 'react-router-dom';
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
  const [postList, setPostList] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(UserContext);
  const { id } = useParams();

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
          const { data: userDataInfo } = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, config);
          const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts/user/${id}`, config);
          setUserInfo(userDataInfo);
          setPostList(data);
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

  console.log(postList);
  return (
    <>
      <Header />
      <Container>
        <Title>
          {userInfo && `${userInfo?.name} Post's` }
        </Title>
        <Content>
          <PostsArea margin={windowWidth}>
            <Timeline>
              {isLoading && (
                <h3>
                  Loading profile...
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
