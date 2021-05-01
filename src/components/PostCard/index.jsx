//React
import React, { useState, useEffect, useContext } from 'react';
//Components
import Post from './Post';
import PostForm from './PostForm';
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import { PostModel } from '../../firebase/models';
//CSS
import './index.css';

const Card = () => {
	//Varables
	const ref = firebase.firestore().collection('posts');
	const voteUp = 'voteUp';
	const voteDown = 'voteDown';

	//States
	const [posts, setPosts] = useState([]);

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Context
	const { user } = useContext(SessionApi);

	//Functions
	const updatePost = () => {
		fetchData();
	};

	//Functions
	const upVote = (post) => {
		// ref.doc(post.id).set({ ...post, voteUp: post.voteUp + 1 });
		const voteDocument = firebase
			.firestore()
			.collection('votes')
			.where('userUID', '==', user.uid) // userId
			.where('postUID', '==', post.id) // postId
			.limit(1);

		let postData;
		const postDoc = firebase.firestore().doc(`/posts/${post.id}`); // postId

		postDoc
			.get()
			.then((doc) => {
				if (doc.exists) {
					postData = doc.data();
					postData.postUID = doc.id;
					return voteDocument.get();
				} else {
					return console.error('Post not found');
				}
			})
			.then((data) => {
				// no data in database, not voted yet

				if (data.empty) {
					return firebase
						.firestore()
						.collection('votes')
						.add({
							postUID: post.id, // postUID
							userUID: user.uid,
							voteType: voteUp,
						})
						.then(() => {
							postData.voteUp++;
							return postDoc.update({
								voteUp: firebase.firestore.FieldValue.increment(
									1,
								),
							});
						})
						.then(() => {
							console.log(postData);
							console.log('vote success');
						});
				} else {
					console.log(data.docs[0].data());
					const voteType = data.docs[0].data().voteType;
					if (voteType === voteUp) {
						firebase
							.firestore()
							.doc(`/votes/${data.docs[0].id}`)
							.delete()
							.then(() => {
								postDoc.update({
									voteUp: firebase.firestore.FieldValue.increment(
										-1,
									),
								});
								console.log('unvoted!!! ');
							})
							.catch((err) => {
								console.error(err.code);
							});
					} else if (voteType === voteDown) {
						firebase
							.firestore()
							.doc(`/votes/${data.docs[0].id}`)
							.update({
								voteType: voteUp,
							})
							.then(() => {
								postDoc.update({
									voteUp: firebase.firestore.FieldValue.increment(
										1,
									),
									voteDown: firebase.firestore.FieldValue.increment(
										-1,
									),
								});
								console.log('change to voteUp');
							})
							.catch((err) => {
								console.error(err.code);
							});
					} else {
						console.error('error');
					}
				}
			})
			.catch((err) => {
				console.error(err.code);
			});
		fetchData();
	};

	const downVote = (post) => {
		// ref.doc(post.id).set({ ...post, voteDown: post.voteDown - 1 });
		const voteDocument = firebase
			.firestore()
			.collection('votes')
			.where('userUID', '==', user.uid) // userId
			.where('postUID', '==', post.id) // postId
			.limit(1);

		const postDoc = firebase.firestore().doc(`/posts/${post.id}`); // postId

		let postData;

		postDoc
			.get()
			.then((doc) => {
				if (doc.exists) {
					postData = doc.data();
					postData.postUID = doc.id;
					return voteDocument.get();
				} else {
					return console.error('Post not found');
				}
			})
			.then((data) => {
				// no data in database, not voted yet
				if (data.empty) {
					return firebase
						.firestore()
						.collection('votes')
						.add({
							postUID: post.id, // postUID
							userUID: user.uid,
							voteType: voteDown,
						})
						.then(() => {
							postData.voteDown++;
							return postDoc.update({
								voteDown: firebase.firestore.FieldValue.increment(
									1,
								),
							});
						})
						.then(() => {
							console.log(postData);
							console.log('vote success');
						});
				} else {
					console.log(data.docs[0].data());
					const voteType = data.docs[0].data().voteType;
					// voteDown === voteDown
					if (voteType === voteDown) {
						firebase
							.firestore()
							.doc(`/votes/${data.docs[0].id}`)
							.delete()
							.then(() => {
								postDoc.update({
									voteUp: firebase.firestore.FieldValue.increment(
										-1,
									),
								});
								console.log('unvoted!!! ');
							})
							.catch((err) => {
								console.error(err.code);
							});
						// voteUp === voteUp
					} else if (voteType === voteUp) {
						firebase
							.firestore()
							.doc(`/votes/${data.docs[0].id}`)
							.update({
								voteType: voteDown,
							})
							.then(() => {
								postDoc.update({
									voteUp: firebase.firestore.FieldValue.increment(
										-1,
									),
									voteDown: firebase.firestore.FieldValue.increment(
										1,
									),
								});
								console.log('change to voteDown');
							})
							.catch((err) => {
								console.error(err.code);
							});
					} else {
						console.error('error');
					}
				}
			})
			.catch((err) => {
				console.error(err.code);
			});
		fetchData();
	};

	const fetchData = async () => {
		const postsArray = [];
		ref.onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				postsArray.push({ id: doc.id, ...doc.data() });
			});
			setPosts(postsArray);
		});
	};

	return (
		<div className="card-pane">
			<PostForm updatePost={updatePost} />
			<div className="cardContent-pane">
				{posts.map((post) => (
					<Post post={post} upVote={upVote} downVote={downVote} />
				))}
			</div>
		</div>
	);
};

export default Card;
