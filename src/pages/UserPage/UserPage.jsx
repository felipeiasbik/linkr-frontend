import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import dayjs from 'dayjs';
import { UserContext } from '../../context/userContext.jsx';
import Header from '../../components/Header/Header.jsx';
import Sidebar from '../../components/Sidebar/Sidebar.jsx';
import PostContainer from '../../components/PostContainer/PostContainer.jsx';
import {
  Container, Title, Content, PostsArea, Timeline, FollowButton,
} from './userPageStyle';
import InfinityScroll from '../../hooks/infinityScroll.js';

export default function UserPage() {
  const [postList, setPostList] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [windowWidth, setWindowWidth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [following, setFollowing] = useState();
  const [disabled, setDisabled] = useState(false);
  const [page, setPage] = useState(0);
  const [makeNewRequest, setMakeNewRequest] = useState(true);
  const { userData } = useContext(UserContext);
  const { id } = useParams();
  const [refresh, setRefresh] = useState(false);
  const [oldId, setOldId] = useState(id);

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

  async function handleFollow(followedId) {
    const token = JSON.parse(localStorage.getItem('linkr_token'));
    const config = {
      headers: {
        userId: userData.id,
        Authorization: `Bearer ${token}`,
      },
    };
    setDisabled(true);
    if (following) {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API_URL}/unfollow/${followedId}`, config);
        if (response.status === 204) setFollowing(false);
        return setDisabled(false);
      } catch (error) {
        return alert('There was an unexpected error on unfollow!');
      }
    }
    if (!following) {
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/follow/${followedId}`, {}, config);
        if (response.status === 200) setFollowing(true);
        return setDisabled(false);
      } catch (error) {
        return alert('There was an unexpected error on follow');
      }
    }
    return true;
  }

  async function getUserPosts() {
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
        const offset = page * 10;
        const { data: userDataInfo } = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, config);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts/user/${id}/?offset=${offset}`, config);
        setUserInfo(userDataInfo);
        setFollowing(userDataInfo.followingUser);
        if (postList?.length && oldId === id) {
          const firstPostTimestamp = dayjs(data[0]?.repost_created_at)?.valueOf() || dayjs(data[0]?.created_at)?.valueOf();
          const stopRequests = data.length === 0 || postList.some(({ created_at: createdAt, repost_created_at: repostCreated }) => {
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
    getUserPosts();
    setOldId(id);
  }, [page, id]);

  useEffect(() => {
    setPage(0);
    window.scrollTo(0, 0);
  }, [id]);

  function handleAlterPage() {
    setPage((prevState) => prevState + 1);
  }

  console.log(page);
  console.log(postList);
  return (
    <>
      <Header />
      <Container>
        <Title>
          <div>
            {userInfo && <img alt={userInfo?.name} src={userInfo?.photo} />}
            {userInfo && `${userInfo?.name} Post's` }
          </div>
          {userInfo && userInfo.id !== userData.id && (
            <FollowButton
              data-test="follow-btn"
              disabled={disabled}
              following={following}
              onClick={() => handleFollow(userInfo.id)}
            >
                {following ? 'Unfollow' : 'Follow'}
            </FollowButton>
          )}
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

              {postList?.length ? (
                postList.map((item, index) => (
                  <PostContainer item={item} key={`${item.post_id}-${index}`} refresh={refresh} setRefresh={setRefresh} />
                ))) : ''}

              {(isLoading && postList && postList.length) ? (
                <h3>
                  Loading posts...
                </h3>
              ) : ''}

              {(!isLoading && postList && !postList.length) && (
                <h3 data-test="message">There are no posts yet</h3>
              )}

              {(postList.length >= 10 && !isLoading && !makeNewRequest) ? (
                <InfinityScroll
                  callback={handleAlterPage}
                  executeCallback={postList.length > 0}
                  makeNewRequest={makeNewRequest}
                />
              ) : postList.length > 0 && <h3 data-test="message">No more posts...</h3>}
            </Timeline>
          </PostsArea>
          {(windowWidth) && <Sidebar />}
        </Content>
      </Container>

    </>
  );
}
