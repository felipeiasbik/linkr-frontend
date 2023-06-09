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
            const isRepost = Boolean(repostCreated);
            const postTimestamp = isRepost ? dayjs(repostCreated).valueOf() : dayjs(createdAt).valueOf();
            const isMine = userData.id === userId;
            const isNew = postTimestamp > dayjs(lastUpdate).valueOf();
            if (isNew) {
              if (isMine && !isRepost) return false;
              console.log({ postTimestamp, lastUpdate });
              return true;
            }
            return false;
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
    const newList = newPosts.concat(postList);
    const isRepost = Boolean(newList[0].repost_created_at);
    setLastUpdate(isRepost ? newList[0].repost_created_at : newList[0].created_at);
    setPostList(newList);
    setNewPosts([]);
  }

  async function getPosts() {
    setIsLoading(true);
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
        const isRepost = Boolean(data[0].repost_created_at);
        setLastUpdate(isRepost ? data[0].repost_created_at : data[0].created_at);
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
                    key={`${item.id}-${index}`}
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
