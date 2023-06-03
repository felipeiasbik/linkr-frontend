/* eslint-disable react/jsx-props-no-spreading, no-unused-vars, no-restricted-syntax */

import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ListTags, Tags, TagsContanier, LinkIds,
} from '../styles/sidebarStyles.js';

export default function Sidebar() {
  const navigate = useNavigate();
  const [hashtags, setHashtags] = useState();

  useEffect(() => {
    const token = localStorage.getItem('linkr_token');
    if (!token) {
      navigate('/');
    } else {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      axios.get(`${process.env.REACT_APP_API_URL}/trending`, config)
        .then((res) => {
          const trendings = res.data;
          setHashtags(trendings);
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  }, []);

  return (
    <ListTags data-test="trending">
      <h2>trending</h2>
      <TagsContanier>
        {hashtags?.map(({ tag }) => (
          <LinkIds key={tag} to={`/hashtag/${tag.replace('#', '')}`}>
            <Tags data-test="hashtag" key={tag}>
              #
              {' '}
              {tag.replace('#', '')}
            </Tags>
          </LinkIds>
        ))}
      </TagsContanier>
    </ListTags>
  );
}
