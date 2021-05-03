//React
import React, { useState, useEffect, useContext } from 'react';
import { FaHotjar } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';
import { MdNewReleases } from 'react-icons/md';
import { BsFillBarChartFill } from 'react-icons/bs';
//Components
import Post from './Post';
import PostForm from './PostForm';
import { SessionApi } from '../../hook/SessionApi';
import HashLoader from 'react-spinners/HashLoader';
//Firebase
import firebase from '../../firebase';
import { PostModel } from '../../firebase/models';
//CSS
import './index.css';
import { act } from 'react-dom/test-utils';

const Card = () => {
	//Varables
	const ref = firebase.firestore().collection('posts');
	const voteUp = 'voteUp';
	const voteDown = 'voteDown';

	//States
	const [posts, setPosts] = useState([]);
	const [activeBt, setActiveBt] = useState({
		best: false,
		hot: false,
		new: false,
		top: false,
	});
	const [hoverBt, setHoverBt] = useState({
		best: false,
		hot: false,
		new: false,
		top: false,
	});

	//Context
	const { user, loading, setLoading } = useContext(SessionApi);

	//Functions
	const updatePost = (newPost) => {
		fetchData();
	};

	//Functions
	const upVote = (post) => {
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
		setLoading(true);
		const postsArray = [];
		ref.onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				postsArray.push({ id: doc.id, ...doc.data() });
			});
			setPosts(postsArray);
			setLoading(false);
		});
		setLoading(false);
	};

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="card-pane">
			<PostForm updatePost={updatePost} />
			<div className="sortBtPane">
				<button
					className="sortBt"
					onMouseOver={() => setHoverBt({ ...activeBt, best: true })}
					onMouseLeave={() =>
						setHoverBt({ ...activeBt, best: false })
					}
					onClick={() => {
						setActiveBt({
							hot: false,
							new: false,
							top: false,
							best: true,
						});
						setHoverBt({
							hot: false,
							new: false,
							top: false,
							best: false,
						});
					}}
					style={{
						background: activeBt.best && '#f48c51',
						color: activeBt.best && 'white',
					}}
				>
					<AiFillStar
						size="20px"
						style={{
							marginRight: '0.5rem',
							fill:
								activeBt.best || hoverBt.best
									? 'white'
									: 'black',
						}}
					/>
					Best
				</button>

				<button
					className="sortBt"
					onMouseOver={() => setHoverBt({ ...activeBt, hot: true })}
					onMouseLeave={() => setHoverBt({ ...activeBt, hot: false })}
					onClick={() => {
						setActiveBt({
							best: false,
							new: false,
							top: false,
							hot: true,
						});
						setHoverBt({
							hot: false,
							new: false,
							top: false,
							best: false,
						});
					}}
					style={{
						background: activeBt.hot && '#f48c51',
						color: activeBt.hot && 'white',
					}}
				>
					<FaHotjar
						size="20px"
						style={{
							marginRight: '0.5rem',
							fill:
								activeBt.hot || hoverBt.hot ? 'white' : 'black',
						}}
					/>
					Hot
				</button>

				<button
					className="sortBt"
					onMouseOver={() => setHoverBt({ ...activeBt, new: true })}
					onMouseLeave={() => setHoverBt({ ...activeBt, new: false })}
					onClick={() => {
						setActiveBt({
							best: false,
							new: true,
							top: false,
							hot: false,
						});
						setHoverBt({
							hot: false,
							new: false,
							top: false,
							best: false,
						});
					}}
					style={{
						background: activeBt.new && '#f48c51',
						color: activeBt.new && 'white',
					}}
				>
					<MdNewReleases
						size="20px"
						style={{
							marginRight: '0.5rem',
							fill:
								activeBt.new || hoverBt.new ? 'white' : 'black',
						}}
					/>
					New
				</button>

				<button
					className="sortBt"
					onMouseOver={() => setHoverBt({ ...activeBt, top: true })}
					onMouseLeave={() => setHoverBt({ ...activeBt, top: false })}
					onClick={() => {
						setActiveBt({
							best: false,
							new: false,
							top: true,
							hot: false,
						});
						setHoverBt({
							hot: false,
							new: false,
							top: false,
							best: false,
						});
					}}
					style={{
						background: activeBt.top && '#f48c51',
						color: activeBt.top && 'white',
					}}
				>
					<BsFillBarChartFill
						size="20px"
						style={{
							marginRight: '0.5rem',
							fill:
								activeBt.top || hoverBt.top ? 'white' : 'black',
						}}
					/>
					Top
				</button>
			</div>
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
				<div className="cardContent-pane">
					{posts.map((post, i) => (
						<Post
							key={i}
							post={post}
							upVote={upVote}
							downVote={downVote}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Card;
