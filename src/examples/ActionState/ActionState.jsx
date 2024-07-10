/* eslint-disable react/prop-types */
import React, { useState } from "react";

const delay2Seconds = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Delay of 2 seconds completed");
    }, 1000);
  });
};
// PostItem component
const PostItem = ({ post, isLoading }) => {
  if (isLoading) {
    return <div>Posting ...</div>;
  }
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

// PostForm component
const PostForm = ({ formAction, error }) => {
  return (
    <form action={formAction}>
      <div className="wrapper">
        <label htmlFor="title">Title</label>
        <input id="title" type="text" placeholder="Enter title" name="title" />
      </div>
      <div className="wrapper">
        <label htmlFor="body">Body</label>
        <textarea
          id="body"
          rows="5"
          placeholder="Enter body"
          name="body"
        ></textarea>
      </div>
      <div className="wrapper">
        <button type="submit">Submit</button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
};

// Posts component
const Posts = () => {
  const addPost = (newPost) => {
    setPosts((posts) => [...posts, newPost]);
  };
  const [error, submitAction, isPending] = React.useActionState(
    async (previousState, formData) => {
      await delay2Seconds();
      const newPost = {
        title: formData.get("title"),
        body: formData.get("body"),
      };
      addPost(newPost);
      return null;
    },
    null
  );
  const [posts, setPosts] = useState([]);

  return (
    <div className="screen">
      <div className="wrapper">
        <div>
          <h1>Actions API</h1>
          <p className="para-text">
            Actions are also integrated with React 19’s new form features for
            react-dom. React 19 adds support for passing functions as the action
            and formAction props of form, input, and button elements to
            automatically submit forms with Actions:
          </p>
        </div>
        <div>
          {posts.map((post, index) => (
            <PostItem key={index} post={post} isLoading={isPending} />
          ))}
          <PostForm formAction={submitAction} error={error} />
        </div>
      </div>
    </div>
  );
};
export { Posts as ActionState };
