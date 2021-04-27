import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { SessionApi } from '../../hook/SessionApi';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import firebase from '../../firebase';
import { User } from '../../firebase/models';

const Post = ({ post, upVote, downVote }) => {
	const history = useHistory();
	const { session } = useContext(SessionApi);
	const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
	//States
	const [posts, setPosts] = useState(post);
	const [postUser, setPostUser] = useState('');

	//Function
	const handlePostClick = () => {
		console.log('post clicked');
		history.push(`/post/${posts.id}`);
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
		<div id={posts.id} className="postPane">
			<div className="infoPane">
				<div className="votePane">
					<button onClick={() => upVote(post)} className="voteUpBT">
						⬆
					</button>

					{post.voteUp + post.voteDown}

					<button
						onClick={() => downVote(post)}
						className="voteDownBT"
					>
						⬇
					</button>
				</div>
				<p>Comments</p>
			</div>

			<div>
				<div className="post">
					<div>
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
							<p className="username">@{post.userUID}</p>
							<p className="timestamp">
								{' '}
								-{' '}
								{new Date(post.timeStamp).toLocaleString([], {
									dateStyle: 'long',
									timeStyle: 'short',
								})}
							</p>
						</div>
						<div className="postContent" onClick={handlePostClick}>
							<p>{parse(post.content)}</p>
							{/* แสดง Post */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
