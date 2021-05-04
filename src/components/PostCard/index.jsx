//React
import React, { useState, useEffect, useContext } from "react";
import { FaHotjar } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { MdNewReleases } from "react-icons/md";
import { BsFillBarChartFill } from "react-icons/bs";
//Components
import Post from "./Post";
import PostForm from "./PostForm";
import { SessionApi } from "../../hook/SessionApi";
import HashLoader from "react-spinners/HashLoader";
//Firebase
import firebase from "../../firebase";
import { PostModel } from "../../firebase/models";
//CSS
import "./index.css";
import { act } from "react-dom/test-utils";
import { PostService } from "../../services";

const Card = () => {
  //Varables
  const ref = firebase.firestore().collection("posts");
  // const voteUp = 'voteUp';
  // const voteDown = 'voteDown';

  //States
  const [posts, setPosts] = useState([]);
  const [activeBt, setActiveBt] = useState({
    best: false,
    hot: false,
    new: false,
    top: false,
  });
  const [hoverBt, setHoverBt] = useState({
    best: false,
    hot: false,
    new: false,
    top: false,
  });
  const [newPost, setNewPost] = useState();

  //Context
  const { user, loading, setLoading, userInfo, authListener } = useContext(SessionApi);

  //Functions
  const updatePost = (newPost) => {
    // setPosts([newPost, ...posts])
    fetchData();
  };

  const fetchData = async () => {
    setLoading(true);
    const postsArray = [];
    const subCom = [];
    // console.log('userInfo : ', userInfo)
    // console.log(Array.isArray(userInfo.mySubCom), userInfo.mySubCom);
    try {
      if (Array.isArray(userInfo.mySubCom)) {
        userInfo.mySubCom.forEach(data => {
          subCom.push(data.value)
          // console.log(typeof data.value)
        })
        // console.log('subCom : ', subCom, Array.isArray(subCom));
        ref
          .orderBy("timeStamp", "desc")
          .where("subComUID", "in", [...subCom])
          .onSnapshot((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              postsArray.push({ id: doc.id, ...doc.data() });
            });
            // console.log('Array : ', postsArray)
            setPosts(postsArray);
            setLoading(false);
          }, (error) => {
            console.log(error)
          });
      } else {
        console.log("error");
        // ref
        // .orderBy("timeStamp", "desc")
        // .limit(10)
        // .onSnapshot((querySnapshot) => {
        //   querySnapshot.forEach((doc) => {
        //     postsArray.push({ id: doc.id, ...doc.data() });
        //   });
        //   setPosts(postsArray);
        //   setLoading(false);
        // });
      }
      // console.log(posts);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      ref
      .orderBy("timeStamp", "desc")
      .limit(10)
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            postsArray.push({ id: doc.id, ...doc.data() });
          });
          setPosts(postsArray);
          console.log(postsArray)
        });
    }

  };

  //Effects
  useEffect(() => {
    fetchData();
  }, [userInfo]);

  return (
    <div className="card-pane">
      <PostForm updatePost={updatePost} />
      <div className="sortBtPane">
        <button
          className="sortBt"
          onMouseOver={() => setHoverBt({ ...activeBt, best: true })}
          onMouseLeave={() => setHoverBt({ ...activeBt, best: false })}
          onClick={() => {
            setActiveBt({
              hot: false,
              new: false,
              top: false,
              best: true,
            });
            setHoverBt({
              hot: false,
              new: false,
              top: false,
              best: false,
            });
          }}
          style={{
            background: activeBt.best && "#f48c51",
            color: activeBt.best && "white",
          }}
        >
          <AiFillStar
            size="20px"
            style={{
              marginRight: "0.5rem",
              fill: activeBt.best || hoverBt.best ? "white" : "black",
            }}
          />
          Best
        </button>

        <button
          className="sortBt"
          onMouseOver={() => setHoverBt({ ...activeBt, hot: true })}
          onMouseLeave={() => setHoverBt({ ...activeBt, hot: false })}
          onClick={() => {
            setActiveBt({
              best: false,
              new: false,
              top: false,
              hot: true,
            });
            setHoverBt({
              hot: false,
              new: false,
              top: false,
              best: false,
            });
          }}
          style={{
            background: activeBt.hot && "#f48c51",
            color: activeBt.hot && "white",
          }}
        >
          <FaHotjar
            size="20px"
            style={{
              marginRight: "0.5rem",
              fill: activeBt.hot || hoverBt.hot ? "white" : "black",
            }}
          />
          Hot
        </button>

        <button
          className="sortBt"
          onMouseOver={() => setHoverBt({ ...activeBt, new: true })}
          onMouseLeave={() => setHoverBt({ ...activeBt, new: false })}
          onClick={() => {
            setActiveBt({
              best: false,
              new: true,
              top: false,
              hot: false,
            });
            setHoverBt({
              hot: false,
              new: false,
              top: false,
              best: false,
            });
          }}
          style={{
            background: activeBt.new && "#f48c51",
            color: activeBt.new && "white",
          }}
        >
          <MdNewReleases
            size="20px"
            style={{
              marginRight: "0.5rem",
              fill: activeBt.new || hoverBt.new ? "white" : "black",
            }}
          />
          New
        </button>

        <button
          className="sortBt"
          onMouseOver={() => setHoverBt({ ...activeBt, top: true })}
          onMouseLeave={() => setHoverBt({ ...activeBt, top: false })}
          onClick={() => {
            setActiveBt({
              best: false,
              new: false,
              top: true,
              hot: false,
            });
            setHoverBt({
              hot: false,
              new: false,
              top: false,
              best: false,
            });
          }}
          style={{
            background: activeBt.top && "#f48c51",
            color: activeBt.top && "white",
          }}
        >
          <BsFillBarChartFill
            size="20px"
            style={{
              marginRight: "0.5rem",
              fill: activeBt.top || hoverBt.top ? "white" : "black",
            }}
          />
          Top
        </button>
      </div>
      {loading ? (
        <div className="auth-loading">
          <HashLoader
            className="auth-loading"
            color={"#272727"}
            loading={loading}
            size={100}
          />
        </div>
      ) : (
        <div className="cardContent-pane">
          {posts.map((post, i) => (
            <Post key={i} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
