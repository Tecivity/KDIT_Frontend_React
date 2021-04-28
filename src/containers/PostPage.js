import React, { useEffect,useState } from 'react';
import { Navbar, Card, SideNavbar, FullPost } from '../components';
import { useHistory, useParams } from 'react-router-dom';
import firebase from '../firebase';
import { PostModel } from '../firebase/models';


const PostPage = () => {
	const { id } = useParams();
	const ref = firebase.firestore().collection('posts').doc(id)
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
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<>
			<Navbar />
			<SideNavbar />
			<div className>
				<FullPost post={post} upVote={upVote} downVote={downVote} />
			</div>
		</>
	);
};

export default PostPage;
