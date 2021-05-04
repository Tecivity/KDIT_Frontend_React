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
	// const voteUp = 'voteUp';
	// const voteDown = 'voteDown';

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
	const [newPost, setNewPost] = useState();

	//Context
	const { user, loading, setLoading } = useContext(SessionApi);

	//Functions
	const updatePost = (newPost) => {
		// setPosts([newPost, ...posts])
		fetchData();
	};

	// const db = firebase.firestore();
	// const upVote = (post) => {
	// 	console.log(post);
	// 	const list = post.voteUp;
	// 	const userUID = user.uid;
	// 	if (Array.isArray(list)) {
	// 		if (list.some((id) => id === userUID)) {
	// 			//  already voteUp => unvoteUp
	// 			db.collection('posts')
	// 				.doc(post.id)
	// 				.update({
	// 					voteUp: firebase.firestore.FieldValue.arrayRemove(
	// 						user.uid,
	// 					),
	// 				});
	// 			console.log('unvoteUp');
	// 		} else if (post.voteDown.some((id) => id === userUID)) {
	// 			// already voteDown
	// 			// change from voteDown to voteUp
	// 			db.collection('posts')
	// 				.doc(post.id)
	// 				.update({
	// 					// add userUID to voteUp Array
	// 					voteUp: firebase.firestore.FieldValue.arrayUnion(
	// 						user.uid,
	// 					),
	// 					// remove userUID from voteDown Array
	// 					voteDown: firebase.firestore.FieldValue.arrayRemove(
	// 						user.uid,
	// 					),
	// 				});
	// 			console.log('change from voteDown to voteUp');
	// 		} else {
	// 			// not vote yet => voteUp
	// 			db.collection('posts')
	// 				.doc(post.id)
	// 				.update({
	// 					voteUp: firebase.firestore.FieldValue.arrayUnion(
	// 						user.uid,
	// 					),
	// 				});

	// 			console.log('voteUp success');
	// 		}
	// 	} else {
	// 		db.collection('posts').doc(post.id).update({
	// 			voteUp: [],
	// 		});
	// 		console.log('change voteUp to array');
	// 	}
	// };

	// const downVote = (post) => {
	// 	console.log(post);
	// 	const list = post.voteDown;
	// 	const userUID = user.uid;
	// 	if (Array.isArray(list)) {
	// 		if (list.some((id) => id === userUID)) {
	// 			//  already voteDown => unvoteDown
	// 			db.collection('posts')
	// 				.doc(post.id)
	// 				.update({
	// 					voteDown: firebase.firestore.FieldValue.arrayRemove(
	// 						user.uid,
	// 					),
	// 				});
	// 			console.log('unvoteDown');
	// 		} else if (post.voteUp.some((id) => id === userUID)) {
	// 			// already voteUp
	// 			// change from voteUp to voteDown
	// 			db.collection('posts')
	// 				.doc(post.id)
	// 				.update({
	// 					// add userUID to voteDown Array
	// 					voteDown: firebase.firestore.FieldValue.arrayUnion(
	// 						user.uid,
	// 					),
	// 					// remove userUID from voteUp Array
	// 					voteUp: firebase.firestore.FieldValue.arrayRemove(
	// 						user.uid,
	// 					),
	// 				});
	// 			console.log('change from voteUp to voteDown');
	// 		} else {
	// 			// not vote yet => voteDown
	// 			db.collection('posts')
	// 				.doc(post.id)
	// 				.update({
	// 					voteDown: firebase.firestore.FieldValue.arrayUnion(
	// 						user.uid,
	// 					),
	// 				});
	// 			console.log('voteDown success');
	// 		}
	// 	} else {
	// 		db.collection('posts').doc(post.id).update({
	// 			voteDown: [],
	// 		});
	// 		console.log('change voteDown to array');
	// 	}
	// };

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
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Card;
