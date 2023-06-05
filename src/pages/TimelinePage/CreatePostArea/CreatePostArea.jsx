import axios from 'axios';
import { useRef } from 'react';
import { FormContainer, CreatePost, UserImage } from './formAreaStyle';

export default function CreatePostArea({ userData }) {
  const formRef = useRef({
    url: '',
    description: '',
    createdAt: '',
  });

  async function handleSendPost(e) {
    e.preventDefault();
    formRef.current.createdAt = Date.now();
    console.log(formRef.current);
    const token = JSON.parse(localStorage.getItem('linkr_token'));

    const config = {
      headers: { userId: userData.id, Authorization: `Bearer ${token}` },
    };
    try {
      const teste = await axios.post(`${process.env.REACT_APP_API_URL}/posts`, formRef.current, config);
      console.log(teste);
    } catch (err) {
      console.log(err.response.data);
    }
  }

  return (
    <CreatePost>
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
        />
        <textarea
          placeholder="Post description."
          onChange={(e) => formRef.current.description = e.target.value}
        />
        <button
          type="submit"
          onClick={handleSendPost}
        >
          Publish
        </button>
      </FormContainer>
    </CreatePost>

  );
}
