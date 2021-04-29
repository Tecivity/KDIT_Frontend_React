import React, { useState, useEffect, useContext } from "react";
import Comment from "../Comment/index";
import parse from "html-react-parser";
import firebase from "../../firebase";
import "./index.css";
import { User } from "../../firebase/models";
import { SessionApi } from "../../hook/SessionApi";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import MyUploadAdapter from "../../firebase/ckeditor_image_firebase";

const FullPost = ({ post, upVote, downVote, id }) => {
  const [postUser, setPostUser] = useState("");

  const { session, user, loading } = useContext(SessionApi);

  //States
	const [newPost, setNewPost] = useState(
		""
	);

  const fetchData = async () => {
    firebase
      .firestore()
      .collection("users")
      .doc(post.userUID)
      .get()
      .then((doc) => {
        const pUser = new User(
          doc.id,
          doc.data().totalVote,
          doc.data().bio,
          doc.data().displayName,
          doc.data().photoURL,
          doc.data().email
        );
        setPostUser(pUser);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    console.log(postUser);
  }, [post]);

  //Functions
  const editPost = () => {
    //Edit Post
    setEdit(!edit);
  };

  const saveChange = async (newContent) => {
    firebase
      .firestore()
      .collection("posts")
      .doc(post.id)
      .update({
        content: newPost
      })
      .then(() => {
        console.log("Update post to firestore");
		window.location.reload()
      });
  };

  //States
  const [edit, setEdit] = useState(false);

  return (
    <div className="fullPane">
      <div>
        <div id={post.id} className="full-postPane">
          <div className="full-infoPane">
            <div className="full-votePane">
              <button onClick={() => upVote(post)} className="full-voteUpBT">
                ⬆
              </button>

              {post.voteUp}

              <button
                onClick={() => downVote(post)}
                className="full-voteDownBT"
              >
                ⬇
              </button>
            </div>
            <p>Comments</p>
          </div>

          <div>
            <div className="full-post">
              <div>
                <img
                  src={postUser.photoURL}
                  alt="full-profile picture"
                  className="fullprofilePic"
                />
              </div>

              <div className="full-postInfo">
                <div className="full-postBy">
                  <p className="full-displayName">{postUser.displayName}</p>
                  <p className="full-username">@{post.userid}</p>
                  <p className="full-timestamp"> - {post.timeStamp}</p>
                </div>
                <div className="full-postContent">
                  {post.content ? (
                    edit ? (
                      <>
                        <div>
                          <p>Edit Mode</p>
                          <CKEditor
                            className="ckEditor"
                            editor={ClassicEditor}
                            data={post.content}
                            config={{
                              mediaEmbed: {
                                previewsInData: true,
                              },
                            }}
                            onReady={(editor, config) => {
                              // You can store the "editor" and use when it is needed.
                              // console.log('Editor is ready to use!', editor);
							  const data = editor.getData();
							  setNewPost(data);
                              if (editor) {
                                editor.plugins.get(
                                  "FileRepository"
                                ).createUploadAdapter = (loader) => {
                                  return new MyUploadAdapter(loader);
                                };
                              }
                            }}
                            onChange={(event, editor) => {
                              const data = editor.getData();
                              // console.log({ event, editor, data });
                              setNewPost(data);
                            }}
                            // onBlur={(event, editor) => {
                            // 	console.log('Blur.', editor);
                            // }}
                            // onFocus={(event, editor) => {
                            // 	console.log('Focus.', editor);
                            // }}
                          />
                          <button onClick={saveChange}>{"Save Change"}</button>
                        </div>
                      </>
                    ) : (
                      //Edit Post
                      <p>{parse(post.content)}</p>
                    )
                  ) : (
                    <div></div>
                  )}

                  {/* แสดง Post */}
                </div>
              </div>
              {post.userUID === user.uid ? (
                <div>
                  <button onClick={editPost}>{edit ? "Cancel" : "Edit"}</button>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        {/* Comments */}
        <div className="commentPane">
          <Comment post={post} id={id} />
        </div>
      </div>
    </div>
  );
};

export default FullPost;
