/* eslint-disable max-len */
import axios from 'axios';
import {
  useEffect, useState, useContext, useRef,
} from 'react';
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
import InfinityScroll from '../../hooks/infinityScroll.js';

export default function TimelinePage() {
  const [postList, setPostList] = useState(null);
  const [windowWidth, setWindowWidth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState();
  const [newPosts, setNewPosts] = useState([]);
  const [lastUpdate, setLastUpdate] = useState();
  const [page, setPage] = useState(0);
  const [makeNewRequest, setMakeNewRequest] = useState(true);
  const { userData } = useContext(UserContext);

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

  async function getPosts() {
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
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts`, config);
        setLastUpdate(timestamp);

        if (postList) {
          const postId = data[0].id;
          const stopRequests = postList.find((post) => post.id === postId);
          if (stopRequests) {
            setMakeNewRequest(false);
          } else {
            setPostList([...postList, ...data]);
          }
        } else {
          setPostList(data);
        }
      } catch (err) {
        console.log(err?.response?.data);
      } finally {
        setIsLoading(false);
      }
    }
  }
  console.log(postList);
  useEffect(() => {
    getPosts();
  }, [page, refresh]);

  function handleAlterPage() {
    setPage((prevState) => prevState + 1);
  }

  return (
    <>
      <Header />
      <Container>
        <Title>timeline</Title>
        <Content>
          <PostsArea margin={windowWidth}>
            <CreatePostArea
              userData={userData}
              refresh={refresh}
              setRefresh={setRefresh}
            />
            <Timeline>

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
              {postList && postList.length > 0 && (
                postList?.map((item, index) => (
                  <PostContainer
                    item={item}
                    key={index}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                )))}
              {isLoading && (
                <h3>
                  Loading posts...
                </h3>
              )}
              {!isLoading && postList && postList.length === 0 && (
                <h3 data-test="message">There are no posts yet</h3>
              )}
              <InfinityScroll
                callback={handleAlterPage}
                makeNewRequest={makeNewRequest}
              />
            </Timeline>
          </PostsArea>
          {windowWidth && <Sidebar />}
        </Content>
      </Container>

    </>
  );
}
