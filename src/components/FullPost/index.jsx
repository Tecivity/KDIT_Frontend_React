//React
import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { MdCancel, MdEdit, MdDelete, MdReportProblem } from "react-icons/md";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import Popup from "reactjs-popup";
import { store } from "react-notifications-component";
//Components
import { BiUpArrow, BiDownArrow, BiCommentDetail } from "react-icons/bi";
import Comment from "../Comment/index";
import { SessionApi } from "../../hook/SessionApi";
//Firebase
import firebase from "../../firebase";
import { User } from "../../firebase/models";
import MyUploadAdapter from "../../firebase/ckeditor_image_firebase";
import {
  CommentService,
  PostService,
  SubComService,
  UserService,
} from "../../services";
//External
import parse from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import ReactTimeAgo from "react-time-ago";
//CSS
import "./index.css";
import "reactjs-popup/dist/index.css";

TimeAgo.addLocale(en);

const FullPost = ({ post, id }) => {
  //States
  const [newPost, setNewPost] = useState("");
  const [postUser, setPostUser] = useState("");
  const [totalComment, setTotalComment] = useState(0);
  const [edit, setEdit] = useState(false);

  const [postDummy, setPostDummy] = useState();
  const [voteUpNum, setVoteUpNum] = useState(0);
  const [voteDownNum, setVoteDownNum] = useState(0);
  const [isVoteUp, setIsVoteup] = useState(false);
  const [isVoteDown, setIsVoteDown] = useState(false);
  const [subComName, setSubComName] = useState("");

  //Contexts
  const { session, user, loading, userInfo } = useContext(SessionApi);

  //History
  const history = useHistory();

  //DropDown Menu
  const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);

  const check = async () => {
    console.log(postDummy.voteUp.includes(userInfo.id));
    if (postDummy.voteUp.includes(userInfo.id)) {
      setIsVoteup(true);
      setIsVoteDown(false);
    } else if (postDummy.voteDown.includes(userInfo.id)) {
      setIsVoteup(false);
      setIsVoteDown(true);
    }
  };

  const upVote = async () => {
    const voteUpList = postDummy.voteUp;
    const voteDownList = postDummy.voteDown;
    if (voteDownList.includes(userInfo.id)) {
      voteDownList.pop(userInfo.id);
      voteUpList.push(userInfo.id);
      PostService.updatePost(post.id, {
        voteUp: voteUpList,
        voteDown: voteDownList,
      }).then(() => {
        PostService.getPost(post.id).then((data) => {
          setPostDummy(data);
          setVoteUpNum(data.voteUp.length);
          setVoteDownNum(data.voteDown.length);
        });
      });
    } else if (voteUpList.includes(userInfo.id)) {
      voteUpList.pop(userInfo.id);
      PostService.updatePost(post.id, { voteUp: voteUpList }).then(() => {
        PostService.getPost(post.id).then((data) => {
          setPostDummy(data);
          setVoteUpNum(data.voteUp.length);
        });
      });
    } else {
      voteUpList.push(userInfo.id);
      PostService.updatePost(post.id, { voteUp: voteUpList }).then(() => {
        PostService.getPost(post.id).then((data) => {
          setPostDummy(data);
          setVoteUpNum(data.voteUp.length);
        });
      });
    }

    if (voteUpList.includes(userInfo.id)) {
      setIsVoteup(true);
      setIsVoteDown(false);
      store.addNotification({
        title: "You up vote this post.",
        message:
          "Keep support good content creators to make our world a better place!",
        type: "default",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__flipInX"],
        animationOut: ["animate__animated", "animate__zoomOut"],
        dismiss: {
          duration: 8000,
          onScreen: true,
          pauseOnHover: true,
        },
      });
    } else {
      setIsVoteup(false);
    }
  };

  const downVote = async () => {
    const voteUpList = postDummy.voteUp;
    const voteDownList = postDummy.voteDown;
    if (voteUpList.includes(userInfo.id)) {
      voteDownList.push(userInfo.id);
      voteUpList.pop(userInfo.id);
      PostService.updatePost(post.id, {
        voteUp: voteUpList,
        voteDown: voteDownList,
      }).then(() => {
        PostService.getPost(post.id).then((data) => {
          setPostDummy(data);
          setVoteUpNum(data.voteUp.length);
          setVoteDownNum(data.voteDown.length);
        });
      });
    } else if (voteDownList.includes(userInfo.id)) {
      voteDownList.pop(userInfo.id);
      PostService.updatePost(post.id, { voteDown: voteDownList }).then(() => {
        PostService.getPost(post.id).then((data) => {
          setPostDummy(data);
          setVoteDownNum(data.voteDown.length);
        });
      });
    } else {
      voteDownList.push(userInfo.id);
      PostService.updatePost(post.id, { voteDown: voteDownList }).then(() => {
        PostService.getPost(post.id).then((data) => {
          setPostDummy(data);
          setVoteDownNum(data.voteDown.length);
        });
      });
    }
    if (voteDownList.includes(userInfo.id)) {
      setIsVoteDown(true);
      setIsVoteup(false);
      store.addNotification({
        title: "You down vote this post.",
        message: "Thank you for keeping our platform a better place.",
        type: "info",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__flipInX"],
        animationOut: ["animate__animated", "animate__zoomOut"],
        dismiss: {
          duration: 8000,
          onScreen: true,
          pauseOnHover: true,
        },
      });
    } else {
      setIsVoteDown(false);
    }
  };

  const deletePost = () => {
    if (!window.confirm("Are you sure for delete post ❓")) {
      return console.log("Cancel delete.");
    }
    PostService.deletePost(post.id).then(() => {
      history.push(`/`);
    });
  };

  const fetchData = async () => {
    try {
      setPostDummy(post);
      setVoteUpNum(post.voteUp.length);
      setVoteDownNum(post.voteDown.length);
      UserService.getUser(post.userUID).then((data) => {
        setPostUser(data);
      });
      CommentService.getCommentSize(post.id).then((data) => {
        setTotalComment(data);
      });
      SubComService.getSubCom(post.subComUID).then((data) => {
        setSubComName(data.name);
      });
    } catch (err) {
      console.log(err);
    }
  };

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
        content: newPost,
      })
      .then(() => {
        fetchData();
      });
  };

  //Effects
  useEffect(() => {
    fetchData();
  }, [post]);

  return (
    <div className="fullPane">
      <div id={post.id} className="full-postPane">
        <div className="full-infoPane">
          <div className="full-votePane">
            <button
              onClick={upVote}
              className="full-voteUpBT"
              style={{
                background: isVoteUp ? "#c5ffae" : "none",
              }}
            >
              <BiUpArrow size="25px" />
            </button>

            <h4 style={{ margin: "0" }}>{voteUpNum - voteDownNum}</h4>
            <button
              onClick={downVote}
              className="full-voteDownBT"
              style={{
                background: isVoteDown ? "#ffaeae" : "none",
              }}
            >
              <BiDownArrow size="25px" />
            </button>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h3>{totalComment}</h3>
            <BiCommentDetail size="25px" style={{ marginLeft: "0.5rem" }} />
          </div>
        </div>

        <div>
          <div className="full-post">
            <div style={{ marginBottom: "1rem" }}>
              <img
                src={postUser.photoURL}
                alt="full-profile picture"
                className="fullprofilePic"
                onClick={() => history.push(`/profile/${postUser.id}`)}
              />
            </div>

            <div className="full-postInfo">
              <div>
                <div className="full-postBy">
                  <p className="full-displayName">{postUser.displayName}</p>
                  <p className="timestamp">
                    {" "}
                    •{" "}
                    {String(post.timeStamp) !== "undefined" && (
                      <ReactTimeAgo
                        date={String(post.timeStamp)}
                        locale="en-US"
                        style={{ color: "grey" }}
                      />
                    )}
                    <span
                      style={{
                        fontSize: "0.8rem",
                        color: "lightgrey",
                      }}
                    >
                      {" "}
                      -{" "}
                      {new Date(post.timeStamp).toLocaleString([], {
                        dateStyle: "long",
                        timeStyle: "short",
                      })}
                    </span>
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      marginTop: "0.2rem",
                      fontSize: "1rem",
                      color: "grey",
                      textDecoration: "underline",
                    }}
                  >
                    {subComName}
                  </p>
                </div>
              </div>
              <div className="full-postContent">
                {post.content ? (
                  edit ? (
                    <div className="editModePane">
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
                      />
                      <button onClick={saveChange} className="savePostBtn">
                        {"Save Change"}
                      </button>
                    </div>
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
            <div className="reportBtPane">
              <button {...buttonProps} className="reportBt">
                {isOpen ? (
                  <IoIosArrowUp size="25px" />
                ) : (
                  <IoIosArrowDown size="25px" />
                )}
              </button>
              <div className={isOpen ? "visible" : ""} role="menu">
                {post.userUID === user.uid ? (
                  <div>
                    <button onClick={editPost} className="reportBt">
                      {edit ? (
                        <MdCancel
                          size="25px"
                          style={{
                            fill: "#f48c51",
                          }}
                        />
                      ) : (
                        <MdEdit
                          size="25px"
                          style={{
                            fill: "#f48c51",
                          }}
                        />
                      )}
                    </button>
                    {post.userUID == user.uid && (
                      <button onClick={deletePost} className="reportBt">
                        <MdDelete
                          size="25px"
                          style={{
                            fill: "#f48c51",
                          }}
                        />
                      </button>
                    )}
                  </div>
                ) : (
                  <div></div>
                )}
              </div>

              <Popup
                trigger={
                  <button className={isOpen ? "reportBt" : "reportBtHide"}>
                    <MdReportProblem size="25px" style={{ fill: "#f48c51" }} />
                  </button>
                }
                modal
                className="subPopup"
              >
                {(close) => (
                  <div className="modal">
                    <div className="close" onClick={close}>
                      <MdCancel size="30px" style={{ fill: "#f48c51" }} />
                    </div>
                    <div className="header">
                      <h1>Submit a Report</h1>
                    </div>
                    <div className="content">
                      <div className="reportPane">
                        <h3
                          style={{
                            marginTop: "0",
                            borderBottom: "1px solid grey",
                          }}
                        >
                          Thanks for looking out for yourself and your fellow nisits by reporting things that break the rules. Let us know what's happening, and we'll look into it.
                        </h3>
                        <div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Misinformation"
                              id=""
                              value="Misinformation"
                            />
                            <b>Misinformation</b> : Spreading false information such as content that undermines civic processes or provides dangerous health misinformation.<span class="checkmark"></span>
                          </label>
                        </div>
                        <div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Spam"
                              id=""
                              value="Spam"
                            />
                            <b>Spam</b> : Repeated, unwanted, or unsolicited manual or automated actions that negatively affect redditors, communities, and the Nisit platform.<span class="checkmark"></span>
                          </label>
                        </div>
                        <div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Harassment"
                              id=""
                              value="Harassment"
                            />
                            <b>Harassment</b> : Harassing, bullying, intimidating, or abusing an individual or group of people with the result of discouraging them from participating.<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Hate"
                              id=""
                              value="Hate"
                            />
                            <b>Hate</b> : Promoting hate or inciting violence based on identity or vulnerability.<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Threatening violence"
                              id=""
                              value="Threatening violence"
                            />
                            <b>Threatening violence</b> : Encouraging, glorifying, or inciting violence or physical harm against individuals or groups of people, places, or animals.<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Sexualization of minors"
                              id=""
                              value="Sexualization of minors"
                            />
                            <b>Sexualization of minors</b> : Soliciting, sharing, or encouraging the sharing of sexual or suggestive content involving minors or people who appear to be minors.<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Sharing personal information"
                              id=""
                              value="Sharing personal information"
                            />
                            <b>Sharing personal information</b> : Sharing or threatening to share private, personal, or confidential information about someone.<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Involuntary pornography"
                              id=""
                              value="Involuntary pornography"
                            />
                            <b>Involuntary pornography</b> : Sharing, threatening to share, or soliciting intimate or sexually-explicit content of someone without their consent (including fake or "lookalike" pornography).<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Prohibited transaction"
                              id=""
                              value="Prohibited transaction"
                            />
                            <b>Prohibited transaction</b> : Sharing or threatening to share private, personal, or confidential information about someone.<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Impersonation"
                              id=""
                              value="Impersonation"
                            />
                            <b>Impersonation</b> : Impersonating an individual or entity in a misleading or deceptive way. This includes deepfakes, manipulated content, or false attributions.<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Copyright violation"
                              id=""
                              value="Copyright violation"
                            />
                            <b>Copyright violation</b> : Content posted to Reddit that infringes a copyright you own or control. (Note: Only the copyright owner or an authorized representative can submit a report.)<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Trademark violation"
                              id=""
                              value="Trademark violation"
                            />
                            <b>Trademark violation</b> : Content posted to Reddit that infringes a trademark you own or control. (Note: Only the trademark owner or an authorized representative can submit a report.)<span class="checkmark"></span>
                          </label>
                        </div>
						<div>
                          <label htmlFor="">
                            <input
                              type="checkbox"
                              name="Self-harm or suicide"
                              id=""
                              value="Self-harm or suicide"
                            />
                            <b>Self-harm or suicide</b> : Behavior or comments that make you think someone may be considering suicide or seriously hurting themselves.<span class="checkmark"></span>
                          </label>
                        </div>
                        <div
                          style={{
                            marginTop: "1rem",
                          }}
                        >
                          <h3
                            style={{
                              marginTop: "0",
                              borderBottom: "1px solid grey",
                            }}
                          >
                            Please clarify with additional reason for faster operation.
                          </h3>
                          <textarea
                            name=""
                            id=""
                            cols="30"
                            rows="10"
                            style={{
                              resize: "none",
                              width: "100%",
                            }}
                          ></textarea>
                        </div>
                        <button className="postCommentBtn">Submit a Report</button>
                      </div>
                    </div>
                  </div>
                )}
              </Popup>
            </div>
          </div>
        </div>
      </div>
      {/* Comments */}
      <div className="commentPane">
        <Comment post={post} id={id} />
      </div>
    </div>
  );
};

export default FullPost;
