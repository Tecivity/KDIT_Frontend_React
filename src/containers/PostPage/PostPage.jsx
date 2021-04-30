//React
import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useHistory, useParams } from 'react-router-dom';
//Components
import { Navbar, Card, SideNavbar, FullPost } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import { PostModel } from '../../firebase/models';

const PostPage = () => {
	//Params
	const { id } = useParams();

	//Variables
	const ref = firebase.firestore().collection('posts').doc(id);

	//States
	const [post, setPost] = useState({});

	//Effects
	useEffect(() => {
		authListener();
		fetchData();
	}, []);

	//Contexts
	const { authListener, loading } = React.useContext(SessionApi);

	//Functions
	const upVote = (post) => {
		ref.doc(post.id).set({ ...post, voteUp: post.voteUp + 1 });
	};

	const downVote = (post) => {
		ref.doc(post.id).set({ ...post, voteDown: post.voteDown - 1 });
	};

	const fetchData = async () => {
		ref.get().then((doc) => {
			const fetchPost = new PostModel(
				doc.id,
				doc.data().userUID,
				doc.data().content,
				doc.data().voteUp,
				doc.data().voteDown,
				doc.data().timeStamp,
				doc.data().subCom,
				doc.data().subComUID,
			);
			setPost(fetchPost);
		});
		ref.get().then((doc) => {
			setPost({ id: doc.id, ...doc.data() });
		});
		//console.log(`postpage -> id : ${id}, post : ${post.userUID}`)
	};

	return (
		<>
			{loading ? (
				<div className="auth-loading">
					<HashLoader
						className="auth-loading"
						color={'#272727'}
						loading={loading}
						size={100}
					/>
				</div>
			) : (
				<div>
					<Navbar />
					<SideNavbar />
					<div className>
						<FullPost
							post={post}
							id={id}
							upVote={upVote}
							downVote={downVote}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default PostPage;
