//React
import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
//Components
import { SessionApi } from "../../hook/SessionApi";
//Firebase
import firebase from "../../firebase";
import MyUploadAdapter from "../../firebase/ckeditor_image_firebase";
//External
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BiFontSize } from "react-icons/bi";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";

const PostForm = ({ updatePost }) => {
  //Variables
  const defaultImage =
    "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg";
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState();

  //Contexts
  const { session, user, userInfo } = useContext(SessionApi);

  //States
  const [imageURL, setImageURL] = useState(userInfo.photoURL);
  const [post, setPost] = useState({
    content: "",
    subCom: "",
    subComUID: "",
    timeStamp: "",
    userUID: "",
    voteUp: [],
    voteDown: [],
  });
  const [show, setShow] = useState(true);

  const handleChange = (e) => {
    setSelectedData(e);
    console.log(selectedData);
  };

  //Effects
  useEffect(() => {
    setImageURL(userInfo.photoURL);
    setData(userInfo.mySubCom);
  }, [userInfo]);

  //Functions
  const clearInput = () => {
    setPost({
      content: "",
      subCom: "",
      subComUID: "",
      timeStamp: "",
      userUID: "",
      voteUp: [],
      voteDown: [],
    });
  };

  function currentDate() {
    const d = new Date();
    var month = "" + (d.getMonth() + 1);
    var day = "" + d.getDate();
    var year = d.getFullYear();

    if (day.length < 2) day = "0" + day;
    if (month.length < 2) month = "0" + month;

    return [year, month, day].join("-");
  }

  function currentTime() {
    const d = new Date();
    var hour = "" + d.getHours();
    var minute = "" + d.getMinutes();

    if (hour.length < 2) hour = "0" + hour;
    if (minute.length < 2) minute = "0" + minute;

    return [hour, minute].join(":");
  }

  const handleClick = async (e) => {
    if (!selectedData) {
      store.addNotification({
        id: "1",
        title: "Please select sub-community.",
        message:
          "In order to post, you need to select where your post will display!",
        type: "warning",
        insert: "top",
        container: "bottom-right",
        animationIn: ["animate__animated", "animate__flash"],
        animationOut: ["animate__animated", "animate__zoomOut"],
        dismiss: {
          duration: 8000,
          onScreen: true,
          pauseOnHover: true,
        },
      });
    } else {
      if (post.content || String(post.content) !== "") {
        console.log("Here" + String(post.content));
        const newPost = {
          ...post,
          timeStamp: currentDate() + "T" + currentTime(),
          userUID: user.uid,
          subComUID: selectedData.value,
        };
        firebase
          .firestore()
          .collection("posts")
          .add(newPost)
          .then(() => {
            updatePost(newPost);
            e.target.value = "";
            clearInput();
            // window.location.reload();
			console.log("Here!")
            store.addNotification({
              title: "Your story is posted successfully!",
              message:
                "Yay! Nice work for sharing your content, you can review or edit your post  at the new section or on your own profile page.",
              type: "success",
              insert: "top",
              container: "bottom-full",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 8000,
                onScreen: true,
                pauseOnHover: true,
              },
            });
          });
      } else {
        store.addNotification({
          title: "Please insert the story in the editor.",
          message:
            "We can't let you write an empty story! Please insert the story that you want to share.",
          type: "warning",
          insert: "top",
          container: "bottom-right",
          animationIn: ["animate__animated", "animate__flash"],
          animationOut: ["animate__animated", "animate__zoomOut"],
          dismiss: {
            duration: 8000,
            onScreen: true,
            pauseOnHover: true,
          },
        });
      }
    }
  };

  return (
    <>
      {session ? (
        <div className="postFormBox">
          <div className="postForm-profile">
            <img
              src={imageURL}
              onError={() => setImageURL(defaultImage)}
              alt="profile picture"
              className="form-profilePic"
            />
          </div>

          <div className="postForm">
            <CKEditor
              className="ckEditor"
              editor={ClassicEditor}
              data="<p>What's going on today</p>"
              config={{
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "blockQuote",
                  "link",
                  "numberedList",
                  "imageUpload",
                  "mediaEmbed",
                  "|",
                  "undo",
                  "redo",
                ],
                mediaEmbed: {
                  previewsInData: true,
                },
              }}
              onReady={(editor, config) => {
                if (editor) {
                  editor.plugins.get("FileRepository").createUploadAdapter = (
                    loader
                  ) => {
                    return new MyUploadAdapter(loader);
                  };
                }
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setPost({
                  ...post,
                  content: data,
                });
              }}
            />
            <script src="../../ckeditor5/build/ckeditor.js">
              ClassicEditor
            </script>
            <div className="postText">
              <div className="postOption">
                <div className="selectCom">
                  <Select
                    options={data}
                    value={selectedData}
                    onChange={handleChange}
                    placeholder="Select Community..."
                  />
                </div>
                <button onClick={handleClick} className="postBT">
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h1 className="loginWarn">Please Login to Create Post</h1>
        </div>
      )}
    </>
  );
};

export default PostForm;
