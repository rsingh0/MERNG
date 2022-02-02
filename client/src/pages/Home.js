import React from 'react';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  console.log(data);
  if (data) {
    const { getPosts: posts } = data;
    return (
      <div>
        {posts.map((post) => (
          <>
            <div id={post.id}>{JSON.stringify(post)}</div>
            <br />
          </>
        ))}
      </div>
    );
  }
  return <div>Home</div>;
};

const FETCH_POSTS_QUERY = gql`
  query getPosts {
    getPosts {
      body
      id
      username
      comments {
        id
        body
        createdAt
        username
      }
      createdAt
      likes {
        id
        createdAt
        username
      }
      likeCount
      commentCount
    }
  }
`;

export default Home;
