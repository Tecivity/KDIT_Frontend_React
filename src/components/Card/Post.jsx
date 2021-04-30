import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { SessionApi } from '../../hook/SessionApi';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import firebase from '../../firebase';
import { User } from '../../firebase/models';
import { BiUpArrow, BiDownArrow, BiCommentDetail } from 'react-icons/bi';

const Post = ({ post }) => {
	const history = useHistory();
	const { session, user, loading } = useContext(SessionApi);
	const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
	//States
	const [postUser, setPostUser] = useState('');

	//Function
	const handlePostClick = () => {
		console.log('post clicked');
		history.push(`/post/${post.id}`);
	};

	const upVote = (post) => {
		firebase
			.firestore()
			.collection('posts')
			.doc(post.id)
			.set({ ...post, voteUp: post.voteUp + 1 });
		fetchData();
	};

	const downVote = (post) => {
		firebase
			.firestore()
			.collection('posts')
			.doc(post.id)
			.set({ ...post, voteDown: post.voteDown - 1 });
		fetchData();
	};

	const deletePost = () => {
		if (!window.confirm('Are you sure for delete post ❓')) {
			return console.log('Cancel delete.');
		}
		firebase
			.firestore()
			.collection('posts')
			.doc(post.id)
			.delete()
			.then(() => {
				console.log('deleted post.');
				window.location.reload();
			});
	};

	const fetchData = async () => {
		firebase
			.firestore()
			.collection('users')
			.doc(post.userUID)
			.get()
			.then((doc) => {
				const pUser = new User(
					doc.id,
					doc.data().totalVote,
					doc.data().bio,
					doc.data().displayName,
					doc.data().photoURL,
					doc.data().email,
				);
				setPostUser(pUser);
			})
			.catch((err) => {
				console.log(err);
			});
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
							) : (
								<div></div>
							)}
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
					<h4>Comment numbers HERE</h4>
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
