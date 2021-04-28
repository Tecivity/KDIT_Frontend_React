import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import { CommentModel } from '../../firebase/models';
import CommentForm from './CommentForm';
import CommentCard from './CommentCard';

const Comment = ({post, id}) => {
	const ref = firebase
	.firestore()
	.collection('comments')

	//States
	const [comments, setComments] = useState([]);

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
		ref
		.orderBy('timeStamp', 'desc')
		.where('postUID', '==', id)
		.get()
		.then((data) => {
			let data_comments = [];
			data.forEach(doc => {
				const comment = new CommentModel(
					doc.id,
					doc.data().postUID,
					doc.data().userUID,
					doc.data().content,
					doc.data().timeStamp,
					doc.data().voteUp,
					doc.data().voteDown
				)
				data_comments.push(comment);
			})
			setComments(data_comments);
		})
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="commentCard">
			<CommentForm post={post} id={id} />
			<div className="content">
				{comments.map((comment) => (
					<CommentCard
						comment={comment}
					/>
				))}
			</div>
		</div>
	);

	return <></>;
};

export default Comment;
