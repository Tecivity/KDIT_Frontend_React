import React, { useState, useEffect } from "react";
import { SessionApi } from "../../hook/SessionApi";
import { Link } from "react-router-dom";
import profilePic from "../../components/Test.jpg";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const PostForm = ({ updatePost }) => {
  //States
  const [post, setPost] = useState({
    content: "",
    timeStamp: "",
    userid: "",
    id: "",
    voteUp: 0,
    voteDown: 0,
  });

  //Contexts
  const { session } = React.useContext(SessionApi);

  //Functions
  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setPost({ ...post, [name]: value });
    console.log(post);
  };

  const handleClick = (e) => {
    if (post.content) {
      const newPost = {
        ...post,
        timeStamp: new Date().toString(),
        userid: "Default User",
        id: new Date().getTime().toString(),
      };
      updatePost(newPost);
      console.log(e.target.value);
      e.target.value = "";
    }
  };
  return (
    <>
      {session ? (
        <div className="postFormBox">
          <div>
            <img
              src={profilePic}
              alt="profile picture"
              className="profilePic"
            />
          </div>
          <div className="postForm">
            <CKEditor
              editor={ClassicEditor}
              data="<p>What's going on today</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                console.log({ event, editor, data });
              }}
              onBlur={(event, editor) => {
                console.log("Blur.", editor);
              }}
              onFocus={(event, editor) => {
                console.log("Focus.", editor);
              }}
            />
            <div className="postText">
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                placeholder="What's going on today"
                name="content"
                onChange={handleChange}
              ></textarea>
              <div className="postOption">
                <button>Upload Picture/Video</button>
                <button>Event</button>
                <button>Reviews</button>
                <button onClick={handleClick} className="postBT">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 class="loginWarn">Please Login to Create Post</h1>
        </div>
      )}
    </>
  );
};

export default PostForm;
