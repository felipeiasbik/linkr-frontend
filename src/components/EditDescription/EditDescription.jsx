import { useState } from 'react';
import axios from 'axios';
import { EditInput } from './inputStyles';

export default function EditDescription({
  value, setEditDesc, token, userData, postId, setDescState,
}) {
  const [description, setDescription] = useState(value);
  const [waiting, setWaiting] = useState(false);
  function evento(event) {
    if (event.key === 'Escape') {
      setEditDesc(false);
    }
    if (event.key === 'Enter') {
      const config = {
        headers: { userId: userData.id, Authorization: `Bearer ${token}` },
      };
      const body = { description };
      setWaiting(true);
      console.log(body);
      axios.patch(`${process.env.REACT_APP_API_URL}/posts/${postId}`, body, config)
        .then(() => {
          alert('editado');
          setWaiting(false);
          setEditDesc(false);
          setDescState(description);
        })
        .catch((err) => {
          console.log(err);
          setWaiting(false);
          setEditDesc(false);
        });
    }
  }
  return (
    <EditInput
      type="text"
      value={description}
      disabled={waiting}
      onKeyDown={evento}
      onChange={(event) => setDescription(event.target.value)}
    />
  );
}
