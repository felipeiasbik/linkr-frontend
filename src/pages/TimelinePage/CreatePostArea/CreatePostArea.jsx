import { setRef } from '@mui/material';
import axios from 'axios';
import { useRef, useState } from 'react';
import { FormContainer, CreatePost, UserImage } from './createPostArea.js';

export default function CreatePostArea({
  userData, getPosts,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const textAreaRef = useRef();

  async function handleSendPost(e) {
    e.preventDefault();
    setIsLoading(true);
    const postObject = {
      url: inputRef.current.url,
      description: textAreaRef.current.value,
      createdAt: Date.now(),
    };

    if (!postObject.url) {
      setTimeout(() => {
        setIsLoading(false);
        alert('Enter a valid URL');
      }, 500);
      return;
    }

    if (!postObject.description) {
      delete postObject.description;
    }
    const token = JSON.parse(localStorage.getItem('linkr_token'));

    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/posts`, postObject, config);
      inputRef.current.value = '';
      textAreaRef.current.value = '';
      getPosts();
    } catch (err) {
      alert('There was an error while publishing your link.');
    } finally {
      setIsLoading(false);
    }
  }

  function handleChangeInput(value) {
    inputRef.current.url = value;
  }

  function handleChangeTextArea(value) {
    textAreaRef.current.description = value;
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
          onChange={(e) => handleChangeInput(e.target.value)}
          ref={inputRef}
          disabled={isLoading}
          data-test="link"
        />
        <textarea
          placeholder="Post description."
          onChange={(e) => handleChangeTextArea(e.target.value)}
          ref={textAreaRef}
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
