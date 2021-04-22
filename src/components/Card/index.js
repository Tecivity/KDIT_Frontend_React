import './index.css';
import Post from './Post';
import PostForm from './PostForm';
import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import PostService from '../../firebase/firestore';
import { PostModel } from '../../firebase/models';

export default function Card() {
	const ref = firebase.firestore().collection('posts')

	//States
	const [posts, setPosts] = useState([]);

	//Functions
	const updatePost = (newPost) => {
		console.log(newPost.content);
		const newPosts = [newPost, ...posts];
		setPosts(newPosts);
	};

	const upVote = (id) => {
		const targetPostIndex = posts.findIndex((post) => post.id === id);
		const newPosts = [...posts];
		newPosts[targetPostIndex].voteUp += 1;
		setPosts(newPosts);
	};

	const downVote = (id) => {
		const targetPostIndex = posts.findIndex((post) => post.id === id);
		const newPosts = [...posts];
		newPosts[targetPostIndex].voteUp -= 1;
		setPosts(newPosts);
	};

	const fetchData = async () => {
		const postsArray = []
		ref.onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const post = new PostModel(
					doc.id,
					doc.data().userUID,
					doc.data().content,
					doc.data().voteUp,
					doc.data().voteDown,
					doc.data().timeStamp,
					doc.data().subCom,
					doc.data().subComUID,
				)
				postsArray.push(post)
			})
			console.log(postsArray)
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
				{posts.map((post) => {
					return (
						<Post post={post} upVote={upVote} downVote={downVote} />
					);
				})}
			</div>
		</div>
	);
}
