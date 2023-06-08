/* eslint-disable max-len */
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import useInterval from 'use-interval';
import dayjs from 'dayjs';
import { UserContext } from '../../context/userContext.jsx';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import PostContainer from '../../components/PostContainer/PostContainer.jsx';
import CreatePostArea from './CreatePostArea/CreatePostArea.jsx';
import {
  Container, Title, Content, PostsArea, Timeline, NewPosts, ReloadIcon,
} from './timelinePageStyle.js';

export default function TimelinePage() {
  const [postList, setPostList] = useState(null);
  const [windowWidth, setWindowWidth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(UserContext);
  const [refresh, setRefresh] = useState();
  const [newPosts, setNewPosts] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  useEffect(() => {
    setIsLoading(true);
    const currentDate = new Date(Date.now());
    const timestamp = currentDate.getTime();
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
          setLastUpdate(timestamp);
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
          const receivedPosts = data.filter(({ created_at: createdAt, user_id: userId, repost_created_at: repostCreated }) => {
            const postTimestamp = repostCreated ? dayjs(repostCreated).valueOf() : dayjs(createdAt).valueOf();
            const isNew = dayjs(postTimestamp).isAfter(lastUpdate);
            const isMine = userId === userData.id;
            return isNew && !isMine;
          });
          console.log(receivedPosts);
          setNewPosts(receivedPosts);
        } catch (err) {
          console.log(err?.response?.data);
        }
      })();
    }
  }, 15000);

  function handleNewPosts() {
    const currentDate = new Date(Date.now());
    const timestamp = currentDate.getTime();
    setPostList([...newPosts, ...postList]);
    setNewPosts([]);
    setLastUpdate(timestamp);
  }
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
                {`${newPosts.length} new ${newPosts.length > 1 ? 'posts' : 'post'}, load more!`}
                <ReloadIcon />
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
