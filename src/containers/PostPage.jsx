import React, { useEffect, useState } from 'react';
import { Navbar, Card, SideNavbar, FullPost } from '../components';
import { useHistory, useParams } from 'react-router-dom';
import firebase from '../firebase';
import { PostModel } from '../firebase/models';
import { SessionApi } from '../hook/SessionApi';
import HashLoader from "react-spinners/HashLoader"

const PostPage = () => {
	const { id } = useParams();
	const ref = firebase.firestore().collection('posts').doc(id)
	const { authListener, loading } = React.useContext(SessionApi)
	const [post, setPost] = useState({})

	const upVote = (post) => {
		ref.doc(post.id).set({ ...post, voteUp: post.voteUp + 1 });
	};

	const downVote = (post) => {
		ref.doc(post.id).set({ ...post, voteDown: post.voteDown - 1 });
	};

	const fetchData = async () => {
		ref.get().then(doc => {
			const fetchPost = new PostModel(
				doc.id,
				doc.data().userUID,
				doc.data().content,
				doc.data().voteUp,
				doc.data().voteDown,
				doc.data().timeStamp,
				doc.data().subCom,
				doc.data().subComUID,
			)
			setPost(fetchPost)
		})
		//console.log(`postpage -> id : ${id}, post : ${post.userUID}`)
	}

	useEffect(() => {
		authListener()
		fetchData()
	}, [])

	return (
		<>
			{loading ?
				<div className="auth-loading">
					<HashLoader className="auth-loading" color={'#272727'} loading={loading} size={100} />
				</div>
				:
				<div>
					<Navbar />
					<SideNavbar />
					<div className>
						<FullPost post={post} id={id} upVote={upVote} downVote={downVote} />
					</div>
				</div>}

		</>
	);
};

export default PostPage;
