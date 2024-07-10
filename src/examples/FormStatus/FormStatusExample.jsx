import { useFormStatus } from "react-dom";
import { useState } from "react";


// PostItem component
const PostItem = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};

// SubmitButton component
const SubmitButton = () => {
  const { pending } = useFormStatus();
  console.log(pending);

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </button>
  );
};

// PostForm component
const PostForm = ({ addPost }) => {
  const formAction = async (formData) => {
    // Simulate a delay of 2 seconds
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // We have direct access to the form data
    const newPost = {
      title: formData.get("title"),
      body: formData.get("body"),
    };

    addPost(newPost);
  };

  return (
    <form action={formAction} className="wrapper">
      <div className="wrapper">
        <input id="title" type="text" placeholder="Enter title" name="title" />
      </div>
      <div className="wrapper">
        <textarea
          id="body"
          rows="5"
          placeholder="Enter body"
          name="body"
        ></textarea>
      </div>
      <div>
        <SubmitButton />
      </div>
    </form>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const addPost = (newPost) => {
    setPosts((posts) => [...posts, newPost]);
  };

  return (
    <div className="screen wrapper">
      <div>
        <h1 className="header">useFormStatus hook</h1>
        <p className="para-text">
          In design systems, it’s common to write design components that need
          access to information about the 'form' they’re in, without drilling
          props down to the component. This can be done via Context, but to make
          the common case easier, React 19 has added a new hook useFormStatus:
        </p>
      </div>
      <PostForm addPost={addPost} />
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  );
};
export { Posts as FormStatusExample };
