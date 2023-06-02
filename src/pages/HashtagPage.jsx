/* eslint-disable react/jsx-props-no-spreading, no-unused-vars, no-restricted-syntax */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import reactStringReplace from 'react-string-replace';
import Sidebar from '../components/Sidebar.jsx';
import {
  LinkIds, Container, Title, SubContainer, Main, SideBar, Posts, InfoLeft, InfoRight, Articles,
} from '../styles/hashtagStyles.js';

export default function HashtagPage() {
  const { hashtag } = useParams();
  const navigate = useNavigate();
  const [listPosts, setListPosts] = useState([]);
  const [clickedLink, setClickedLink] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('linkr_token');
    if (!token) {
      navigate('/');
    } else {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.get(`${process.env.REACT_APP_API_URL}/trending/${hashtag}`, config)
        .then((res) => {
          const trendings = res.data;
          setListPosts(trendings);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  }, [hashtag, clickedLink]);

  const handleLinkClick = (clickedHashtag) => {
    setClickedLink(clickedHashtag);
  };

  return (
    <Container>
      <Title data-test="hashtag-title">
        #
        {' '}
        {hashtag}
      </Title>
      <SubContainer>
        <Main>
          {listPosts?.map(({
            postId, url, description, name, photo,
          }) => (
            <Posts data-test="post" key={postId}>
              <InfoLeft>
                <img alt={name} src={photo} />
              </InfoLeft>
              <InfoRight>
                <h2>{name}</h2>
                <p>
                  {reactStringReplace(description, /(#\w+)/g, (match, i) => (
                    <LinkIds
                      to={`/hashtag/${match.slice(1)}`}
                      key={i}
                      onClick={() => handleLinkClick(match)}
                      style={{ color: '#FFFFFF' }}
                    >
                      {match}
                    </LinkIds>
                  ))}
                </p>
                <Articles>
                  {url}
                </Articles>
              </InfoRight>
            </Posts>
          ))}
        </Main>
        <SideBar>
          <Sidebar />
        </SideBar>
      </SubContainer>
    </Container>
  );
}
