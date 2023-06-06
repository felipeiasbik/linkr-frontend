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

export default function TimelinePage() {
  const [postList, setPostList] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [windowWidth, setWindowWidth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [following, setFollowing] = useState();
  const [disabled, setDisabled] = useState(false);
  const { userData } = useContext(UserContext);
  const { id } = useParams();
  const { pathname } = useLocation();

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
          setFollowing(userDataInfo.followingUser);
        } catch (err) {
          console.log(err?.response?.data);
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [pathname]);

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
        return alert('There was an unexpected error! on follow');
      }
    }
    return true;
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
          {userInfo && userInfo.id !== userData.id && <FollowButton disabled={disabled} following={following} onClick={() => handleFollow(userInfo.id)}>{following ? 'Unfollow' : 'Follow'}</FollowButton>}
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
                <h3 data-test="message">There are no posts yet</h3>
              )}
            </Timeline>
          </PostsArea>
          {(windowWidth) && <Sidebar />}
        </Content>
      </Container>

    </>
  );
}
