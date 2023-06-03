/* eslint-disable react/jsx-props-no-spreading, no-unused-vars, no-restricted-syntax */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar.jsx';
import {
  Container, Title, SubContainer, Main, SideBar,
} from '../styles/hashtagStyles.js';
import { ListPosts } from '../components/PostsList.jsx';

export default function HashtagPage() {
  const { hashtag } = useParams();
  const navigate = useNavigate();
  const [listPosts, setListPosts] = useState([]);

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
  }, [hashtag]);

  return (
    <Container>
      <Title data-test="hashtag-title">
        #
        {' '}
        {hashtag}
      </Title>
      <SubContainer>
        <Main>
          <ListPosts listPosts={listPosts} />
        </Main>
        <SideBar>
          <Sidebar />
        </SideBar>
      </SubContainer>
    </Container>
  );
}
