import reactStringReplace from 'react-string-replace';
import axios from 'axios';
import {
  useContext, useEffect, useState,
} from 'react';
import { Link } from 'react-router-dom';
import 'react-tooltip/dist/react-tooltip.css';
import { BiRepost } from 'react-icons/bi';
import {
  LinkIds, Posts, InfoLeft, InfoRight, Articles,
  MetaDataInfos, MetaDataImage, PostContent, RepostContent,
} from './postContainerStyle.js';
import { UserContext } from '../../context/userContext.jsx';
import LikesContainer from './LikesContainer/LikesContainer.jsx';
import EditDescription from './EditDescription/EditDescription.jsx';
import OptionsContainer from './OptionsContainer/OptionsContainer.jsx';
import Comments from './Comments/Comments.jsx';
import CommentsContainer from './CommentsContainer/CommentsContainer.jsx';
import Reposts from './Reposts/Reposts.jsx';

export default function PostContainer({
  item, getPosts,
}) {
  const {
    post_id: postId,
    url,
    description,
    name,
    photo,
    created_at: createdAt,
    userLikedPost,
    likeCount,
    likedUsers,
    commentCount,
    user_id: userId,
    repost_user_id: repostUserId,
    repost_user_name: repostUserName,
    repostCount,
  } = item;

  const { userData } = useContext(UserContext);
  const token = JSON.parse(localStorage.getItem('linkr_token'));
  const [waiting, setWaiting] = useState(false);
  const [editDesc, setEditDesc] = useState(false);
  const [descState, setDescState] = useState(description);
  const [metaData, setMetaData] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(commentCount);

  useEffect(() => {
    axios.get(`https://jsonlink.io/api/extract?url=${url}`)
      .then((res) => {
        setMetaData({
          title: res.data.title,
          description: res.data.description,
          images: res.data.images[0],
          url,
        });
      })
      .catch((err) => {
        if (err.config.url.includes('https://jsonlink.io/api/extract')) {
          return false;
        }
        return alert(err.message);
      });
  }, []);

  return (
    <PostContent>
      {repostUserName == null ? ''
        : (
          <RepostContent>
            <BiRepost />
            Re-posted by
            <span>
              <LinkIds to={`/user/${repostUserId}`}>
                {userData.id === repostUserId ? 'you' : repostUserName}
              </LinkIds>
            </span>
          </RepostContent>
        )}
      <Posts data-test="post">
        <OptionsContainer
          userId={userId}
          waiting={waiting}
          setWaiting={setWaiting}
          postId={postId}
          getPosts={getPosts}
          editDesc={editDesc}
          setEditDesc={setEditDesc}
          repostUserId={repostUserId}
        />
        <InfoLeft>
          <Link to={`/user/${item.user_id}`}>
            <img alt={name} src={photo} />
          </Link>
          <LikesContainer
            likedUsers={likedUsers}
            likeCount={likeCount}
            userLikedPost={userLikedPost}
            postId={postId}
            waiting={waiting}
            setWaiting={setWaiting}
          />
          <Comments
            comments={comments}
            showComments={showComments}
            setShowComments={setShowComments}
          />
          <Reposts
            postId={postId}
            repostCount={repostCount}
            waiting={waiting}
            setWaiting={setWaiting}
            getPosts={getPosts}
          />
        </InfoLeft>
        <InfoRight>
          <div>
            <h2>
              <Link data-test="username" to={`/user/${item.user_id}`}>
                {name}
              </Link>
            </h2>
          </div>
          {
          !editDesc
            ? (
              <p data-test="description">
                {reactStringReplace(descState, /(#\w+)/g, (match, i) => (
                  <LinkIds
                    to={`/hashtag/${match.slice(1)}`}
                    key={i}
                  >
                    <span>{match}</span>
                  </LinkIds>
                ))}
              </p>
            )
            : (
              <EditDescription
                value={descState}
                token={token}
                setEditDesc={setEditDesc}
                postId={postId}
                userData={userData}
                setDescState={setDescState}
              />
            )
        }
          <LinkIds to={url} target="_blank" data-test="link">
            <Articles>
              <MetaDataInfos>
                <h2>{metaData?.title}</h2>
                <p>{metaData?.description}</p>
                <p>{metaData?.url}</p>
              </MetaDataInfos>
              <MetaDataImage><img alt="a" src={metaData?.images} /></MetaDataImage>
            </Articles>
          </LinkIds>
        </InfoRight>
      </Posts>
      <CommentsContainer
        userId={userId}
        postId={postId}
        showComments={showComments}
        comments={comments}
        setComments={setComments}
      />
    </PostContent>
  );
}
