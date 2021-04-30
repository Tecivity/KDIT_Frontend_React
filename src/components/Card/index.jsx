import "./index.css";
import Post from "./Post";
import PostForm from "./PostForm";
import React, { useState, useEffect, useContext } from "react";
import firebase from "../../firebase";
import { PostModel } from "../../firebase/models";
import { SessionApi } from '../../hook/SessionApi';

export default function Card() {
  const ref = firebase.firestore().collection("posts");
  const {user} = useContext(SessionApi);
  //States
  const [posts, setPosts] = useState([]);

  //Functions
  const updatePost = () => {
    fetchData();
  };

  const upVote = (post) => {
    // ref.doc(post.id).set({ ...post, voteUp: post.voteUp + 1 });
    const voteDocument = firebase
      .firestore()
      .collection("votes")
      .where("userUID", "==", user.uid) // userId
      .where("postUID", "==", post.id) // postId
      .limit(1);

    const postDoc = firebase.firestore().doc(`/posts/${post.id}`); // postId

    let postData;

    postDoc.get()
	.then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postUID = doc.id;
        return voteDocument.get();
      } else {
        return console.error("Post not found");
      }
    })
	.then((data) => {
		// no data in database, not voted yet
		if(data.empty) {
			return firebase.firestore()
				.collection("votes")
				.add({
					postUID: post.id, // postUID
					userUID: user.uid 
				})
				.then(() => {
					postData.voteUp++;
					return postDoc
					.update({ voteUp: firebase.firestore.FieldValue.increment(1)} );
				})
				.then(() => {
					console.log(postData);
					console.log('vote success');
				})
		} else {
			console.log("unvoted!!! ");
			// firebase.firestore()
			// .doc(`/votes/${data.docs[0].id}`).delete()
			// .then(() => {
			// 	postDoc.update({ voteUp: firebase.firestore.FieldValue.increment(-1)})
			// })
			// .then(() => {
			// 	console.log(postData)
			// })
			// .catch(err => {
			// 	console.error( err.code );
			// })
		}
	})
	.catch(err => {
		console.error( err.code );
	})
    fetchData();
  };

  const downVote = (post) => {
    // ref.doc(post.id).set({ ...post, voteDown: post.voteDown - 1 });
	const voteDocument = firebase
      .firestore()
      .collection("votes")
      .where("userUID", "==", user.uid) // userId
      .where("postUID", "==", post.id) // postId
      .limit(1);

    const postDoc = firebase.firestore().doc(`/posts/${post.id}`); // postId

    let postData;

    postDoc.get()
	.then((doc) => {
      if (doc.exists) {
        postData = doc.data();
        postData.postUID = doc.id;
        return voteDocument.get();
      } else {
        return console.error("Post not found");
      }
    })
	.then((data) => {
		// no data in database, not voted yet
		if(data.empty) {
			return firebase.firestore()
				.collection("votes")
				.add({
					postUID: post.id, // postUID
					userUID: user.uid 
				})
				.then(() => {
					postData.voteDown++;
					return postDoc
					.update({ voteDown: firebase.firestore.FieldValue.increment(1)} );
				})
				.then(() => {
					console.log(postData);
					console.log('vote success');
				})
		} else {
			console.log("unvoted!!! ");
		}
	})
	.catch(err => {
		console.error( err.code );
	})
    fetchData();
  };

  const fetchData = async () => {
    const postsArray = [];
    ref.onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        postsArray.push({id:doc.id, ...doc.data()});
      });
      setPosts(postsArray.reverse());
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="card">
      <PostForm updatePost={updatePost} />
      <div className="content">
        {posts.map((post) => (
          <Post post={post} upVote={upVote} downVote={downVote} />
        ))}
      </div>
    </div>
  );
}
