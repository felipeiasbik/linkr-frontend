/* eslint-disable no-return-assign */
import axios from 'axios';
import { useRef, useState } from 'react';
import { FormContainer, CreatePost, UserImage } from './createPostArea.js';

export default function CreatePostArea({ userData, refresh, setRefresh }) {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef({});

  async function handleSendPost(e) {
    e.preventDefault();
    setIsLoading(true);
    formRef.current.createdAt = Date.now();

    if (!formRef.current.description) {
      delete (formRef.current.description);
    }

    const token = JSON.parse(localStorage.getItem('linkr_token'));

    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/posts`, formRef.current, config);
      formRef.current.url = '';
      formRef.current.description = '';
    } catch (err) {
      alert('There was an error while publishing your link.');
    } finally {
      setIsLoading(false);
      setRefresh(!refresh);
    }
  }

  return (
    <CreatePost data-test="publish-box">
      <UserImage>
        <img alt={userData.name} src={userData.photo} />
      </UserImage>
      <FormContainer>
        <h3>
          What are you going to share today?
        </h3>
        <input
          type="url"
          placeholder="Enter URL"
          onChange={(e) => formRef.current.url = e.target.value}
          value={formRef.current.url}
          disabled={isLoading}
          data-test="link"
        />
        <textarea
          placeholder="Post description."
          onChange={(e) => formRef.current.description = e.target.value}
          value={formRef.current.description}
          disabled={isLoading}
          data-test="description"
        />
        <button
          type="submit"
          onClick={handleSendPost}
          disabled={isLoading}
          data-test="publish-btn"
        >
          {isLoading ? 'Publishing' : 'Publish'}
        </button>
      </FormContainer>
    </CreatePost>

  );
}
