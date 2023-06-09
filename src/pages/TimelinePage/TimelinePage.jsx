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
  const [postList, setPostList] = useState([]);
  const [windowWidth, setWindowWidth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
              return true;
            }
            return false;
          });
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
        const offset = page * 20;
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts/?offset=${offset}`, config);
        if (postList) {
          const firstPostTimestamp = dayjs(data[0].repost_created_at).valueOf() || dayjs(data[0].created_at).valueOf();
          const stopRequests = postList.some(({ created_at: createdAt, repost_created_at: repostCreated }) => {
            const postTimestamp = dayjs(repostCreated).valueOf() || dayjs(createdAt).valueOf();
            return postTimestamp === firstPostTimestamp;
          });
          if (stopRequests) {
            const differences = data.filter((item) => postList.some((post) => (
              (item.repost_created_at || item.created_at) !== (post.repost_created_at || post.created_at)
            )));
            setPostList([...postList, ...differences]);
            setMakeNewRequest(false);
          } else {
            setPostList((prevState) => [...prevState, ...data]);
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
  }, [page]);

  function handleAlterPage() {
    setPage((prevState) => prevState + 1);
  }
  async function refreshPosts() {
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
        setPostList(data);
      } catch (err) {
        console.log(err?.response?.data);
      } finally {
        setIsLoading(false);
      }
    }
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
              getPosts={refreshPosts}
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
                    getPosts={refreshPosts}
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
              {postList.length && (
              <InfinityScroll
                callback={handleAlterPage}
                executeCallback={postList.length > 0}
                makeNewRequest={makeNewRequest}
              />
              )}
            </Timeline>
          </PostsArea>
          {windowWidth && <Sidebar />}
        </Content>
      </Container>

    </>
  );
}
