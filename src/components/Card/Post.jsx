import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { SessionApi } from '../../hook/SessionApi';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import firebase from '../../firebase';
import { BiUpArrow, BiDownArrow, BiCommentDetail } from 'react-icons/bi';
import { CommentService, PostService, UserService } from '../../services';

const Post = ({ post }) => {
	const history = useHistory();
	const { session, user, loading } = useContext(SessionApi);
	const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
	//States
	const [postUser, setPostUser] = useState('');
	const [totalComment, setTotalComment] = useState(0)

	//Function
	const handlePostClick = () => {
		console.log('post clicked');
		history.push(`/post/${post.id}`);
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

	// const upVote = (post) => {
	// 	firebase
	// 		.firestore()
	// 		.collection('posts')
	// 		.doc(post.id)
	// 		.set({ ...post, voteUp: post.voteUp + 1 });
	// 	fetchData();
	// };

	// const downVote = (post) => {
	// 	firebase
	// 		.firestore()
	// 		.collection('posts')
	// 		.doc(post.id)
	// 		.set({ ...post, voteDown: post.voteDown - 1 });
	// 	fetchData();
	// };

	const deletePost = () => {
		if (!window.confirm('Are you sure for delete post ❓')) {
			return console.log('Cancel delete.');
		}
		PostService.deletePost(post.id).then(()=>{
			window.location.reload()
		})
	};

	const fetchData = async () => {
		UserService.getUser(post.userUID).then(data=>{
			setPostUser(data)
		})
		CommentService.getCommentSize(post.id).then(data=>{
			setTotalComment(data)
		})
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div id={post.id} className="postPane">
			<div>
				<div className="post">
					<div onClick={handlePostClick}>
						<img
							src={postUser.photoURL}
							onError={defaultImage}
							alt="profile picture"
							className="profilePic"
						/>
					</div>

					<div className="postInfo">
						<div className="postBy">
							<p className="displayName">
								{postUser.displayName}
							</p>
							{/* <p className="username">@{post.userUID}</p> */}
							<p className="timestamp">
								{' '}
								•{' '}
								{new Date(post.timeStamp).toLocaleString([], {
									dateStyle: 'long',
									timeStyle: 'short',
								})}
							</p>
							{post.userUID == user.uid ? (
								<div>
									<button onClick={deletePost}>X</button>
								</div>
							) : (<div></div>)}
						</div>
						<div className="postContent" onClick={handlePostClick}>
							<p>{parse(post.content)}</p>
							{/* แสดง Post */}
						</div>
					</div>
				</div>
			</div>
			<div className="infoPane">
				<div className="votePane">
					<button onClick={() => upVote(post)} className="voteUpBT">
						<BiUpArrow size="25px" />
					</button>

					{post.voteUp + post.voteDown}

					<button
						onClick={() => downVote(post)}
						className="voteDownBT"
					>
						<BiDownArrow size="25px" />
					</button>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<h4>{totalComment}</h4>
					<BiCommentDetail
						size="25px"
						style={{ marginLeft: '0.5rem' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default Post;
