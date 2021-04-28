import React, { useState,useEffect } from 'react';
import Comment from '../Comment/index';
import parse from 'html-react-parser';
import firebase from '../../firebase'
import './index.css';
import { User } from '../../firebase/models';

const FullPost = ({ post, upVote, downVote, id }) => {
	const [postUser, setPostUser] = useState('');

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
		console.log(postUser)
	}, [post]);
	
	return (
		<div className="fullPane">
			<div>
				<div id={post.id} className="full-postPane">
					<div className="full-infoPane">
						<div className="full-votePane">
							<button
								onClick={() => upVote(post)}
								className="full-voteUpBT"
							>
								⬆
							</button>

							{post.voteUp}

							<button
								onClick={() => downVote(post)}
								className="full-voteDownBT"
							>
								⬇
							</button>
						</div>
						<p>Comments</p>
					</div>

					<div>
						<div className="full-post">
							<div>
								<img
									src={postUser.photoURL}
									alt="full-profile picture"
									className="full-profilePic"
								/>
							</div>

							<div className="full-postInfo">
								<div className="full-postBy">
									<p className="full-displayName">
										{postUser.displayName}
									</p>
									<p className="full-username">
										@{post.userid}
									</p>
									<p className="full-timestamp">
										{' '}
										- {post.timeStamp}
									</p>
								</div>
								<div className="postContent">
									{post.content ? (
										<p>{parse(post.content)}</p>
									) : (
										<div></div>
									)}

									{/* แสดง Post */}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Comments */}
				<div className="commentPane">
					<Comment post={post} id={id} />
				</div>
			</div>
		</div>
	);
};

export default FullPost;
