import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import useInterval from 'use-interval';
import { UserContext } from '../../context/userContext.jsx';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import PostContainer from '../../components/PostContainer/PostContainer.jsx';
import CreatePostArea from './CreatePostArea/CreatePostArea.jsx';
import {
  Container, Title, Content, PostsArea, Timeline, NewPosts, ReloadIcon,
} from './timelinePageStyle.js';
import realoadIcon from '../../assets/realoadIcon.png';

export default function TimelinePage() {
  const [postList, setPostList] = useState(null);
  const [windowWidth, setWindowWidth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(UserContext);
  const [refresh, setRefresh] = useState();
  const [newPosts, setNewPosts] = useState([]);
  const [mostRecently, setMostRecently] = useState();
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
          setMostRecently(data[0]);
          setPostList(data);
        } catch (err) {
          console.log(err?.response?.data);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [refresh]);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setWindowWidth(true);
    } else {
      setWindowWidth(false);
    }

    const handleSize = () => {
      if (window.innerWidth > 768) {
        setWindowWidth(true);
      } else {
        setWindowWidth(false);
      }
    };
    window.addEventListener('resize', handleSize);

    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  useInterval(() => {
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
          const receivedPosts = data.filter(({ created_at: createdAt, user_id: userId }) => {
            const lastTimeStamp = new Date(mostRecently.created_at).getTime();
            const newPostTimeStamp = new Date(createdAt).getTime();
            const notMe = userData.id !== userId;
            return notMe && newPostTimeStamp > lastTimeStamp;
          });
          setNewPosts(receivedPosts);
        } catch (err) {
          console.log(err?.response?.data);
        }
      })();
    }
  }, 15000);

  function handleNewPosts() {
    const notDuplicated = newPosts.filter(({ id }) => {
      const duplicated = postList.some(({ post_id: postId }) => postId === id);
      return !duplicated;
    });
    const newPostList = [...notDuplicated, ...postList];
    setPostList(newPostList);
    setNewPosts([]);
    setMostRecently(newPostList[0]);
  }
  console.log(postList);
  return (
    <>
      <Header />
      <Container>
        <Title>timeline</Title>
        <Content>
          <PostsArea margin={windowWidth}>
            <CreatePostArea userData={userData} refresh={refresh} setRefresh={setRefresh} />
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
              {!isLoading && newPosts.length > 0 && (
              <NewPosts onClick={handleNewPosts}>
                {newPosts.length}
                {' '}
                new posts, load more!
                {' '}
                <ReloadIcon src={realoadIcon} />
              </NewPosts>
              ) }
              {!isLoading && postList && postList.length > 0 && (
                postList?.map((item) => (
                  <PostContainer
                    item={item}
                    key={item.post_id}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                )))}
              {!isLoading && postList && postList.length === 0 && (
                <h3 data-test="message">There are no posts yet</h3>
              )}
            </Timeline>
          </PostsArea>
          {windowWidth && <Sidebar />}
        </Content>
      </Container>

    </>
  );
}
