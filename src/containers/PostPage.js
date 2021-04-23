import React, { useContext } from 'react';
import { Navbar, Card, SideNavbar, FullPost } from '../components';
import { useHistory, useParams } from "react-router-dom";
import firebase from '../firebase'

const PostPage = () => {
	const { id } = useParams();
	const ref = firebase.firestore().collection('posts')
	const post = ref.doc(id)

	const upVote = (post) => {
		ref.doc(post.id).set({...post, voteUp:post.voteUp+1})
	};

	const downVote = (post) => {
		ref.doc(post.id).set({...post, voteDown:post.voteDown-1})
	};

	return (
		<>
			<Navbar />
			<SideNavbar />
			<div className="postPane">
				<FullPost post={post} upVote={upVote} downVote={downVote}/>
			</div>
		</>
	);
};

export default PostPage;
