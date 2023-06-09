import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
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
        const { data: userDataInfo } = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, config);
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/posts/user/${id}`, config);
        setUserInfo(userDataInfo);
        setFollowing(userDataInfo.followingUser);
        if (postList?.length && oldId === id) {
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
    getUserPosts();
    setOldId(id);
  }, [page, id]);

  function handleAlterPage() {
    setPage((prevState) => prevState + 1);
  }

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
              {!postList?.length && !isLoading && (
              <h3>
                An error occured while trying to fetch the posts, please refresh the page
              </h3>
              )}

              {postList?.length && postList.length > 0 && (
                postList?.map((item, index) => (
                  <PostContainer item={item} key={`${item.post_id}-${index}`} refresh={refresh} setRefresh={setRefresh} />
                )))}

              {isLoading && postList && postList.length > 0 && (
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
          {(windowWidth) && <Sidebar />}
        </Content>
      </Container>

    </>
  );
}
