//React
import React, { useState, useEffect } from 'react';
//Components
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';
//Firebase
import firebase from '../../firebase';
import { CommentModel } from '../../firebase/models';

const Comment = ({ post, id }) => {
	//Variables
	const ref = firebase.firestore().collection('comments');

	//States
	const [comments, setComments] = useState([]);

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Functions
	// const updatePost = () => {
	// 	fetchData();
	// };

	// const upVote = (post) => {
	// 	ref.doc(post.id).set({ ...post, voteUp: post.voteUp + 1 });
	// 	fetchData();
	// };

	// const downVote = (post) => {
	// 	ref.doc(post.id).set({ ...post, voteDown: post.voteDown - 1 });
	// 	fetchData();
	// };

	const fetchData = async () => {
		ref.orderBy('timeStamp', 'desc')
			.where('postUID', '==', id)
			.get()
			.then((data) => {
				let data_comments = [];
				data.forEach((doc) => {
					const comment = new CommentModel(
						doc.id,
						doc.data().postUID,
						doc.data().userUID,
						doc.data().content,
						doc.data().timeStamp,
						doc.data().voteUp,
						doc.data().voteDown,
					);
					data_comments.push(comment);
				});
				setComments(data_comments);
			});
	};

	return (
		<div className="commentCard">
			<CommentForm post={post} id={id} />
			<div className="content">
				{comments.map((comment, i) => (
					<CommentCard key={i} comment={comment} />
				))}
			</div>
		</div>
	);
};

export default Comment;
