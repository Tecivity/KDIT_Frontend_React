import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import { PostModel } from '../../firebase/models';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

const Comment = () => {
	const ref = firebase.firestore().collection('posts');

	//States
	const [posts, setPosts] = useState([]);

	//Functions
	const updatePost = () => {
		fetchData();
	};

	const upVote = (post) => {
		ref.doc(post.id).set({ ...post, voteUp: post.voteUp + 1 });
		fetchData();
	};

	const downVote = (post) => {
		ref.doc(post.id).set({ ...post, voteDown: post.voteDown - 1 });
		fetchData();
	};

	const fetchData = async () => {
		const postsArray = [];
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
				);
				postsArray.push(post);
			});
			setPosts(postsArray.reverse());
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="commentCard">
			<CommentForm />
			<div className="content">
				{posts.map((post) => (
					<CommentCard
						post={post}
						upVote={upVote}
						downVote={downVote}
					/>
				))}
			</div>
		</div>
	);

	return <></>;
};

export default Comment;