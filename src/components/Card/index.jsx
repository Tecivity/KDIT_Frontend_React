import "./index.css";
import Post from "./Post";
import PostForm from "./PostForm";
import React, { useState, useEffect, useContext } from "react";
import firebase from "../../firebase";
import { PostModel } from "../../firebase/models";
import { SessionApi } from '../../hook/SessionApi';

export default function Card() {
  const ref = firebase.firestore().collection("posts")
  const {user} = useContext(SessionApi)
  //States
  const [posts, setPosts] = useState([])

  //Functions
  const updatePost = () => {
    fetchData()
  };

  const fetchData = async () => {
    const postsArray = [];
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postsArray.push({id:doc.id, ...doc.data()})
      })
      setPosts(postsArray)
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="card">
      <PostForm updatePost={updatePost} />
      <div className="content">
        {posts.map((post) => (
          <Post post={post}/>
        ))}
      </div>
    </div>
  )
}
