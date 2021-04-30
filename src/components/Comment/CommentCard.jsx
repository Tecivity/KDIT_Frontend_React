//React
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
//Components
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import { User } from '../../firebase/models';
//External
import parse from 'html-react-parser';
//CSS
import './index.css';

const CommentCard = ({ comment }) => {
	//Variables
	const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';

	//States
	const [commentOwner, setcommentOwner] = useState({});

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Context
	const { session } = useContext(SessionApi);

	//Hstory
	const history = useHistory();

	//Functions
	const fetchData = async () => {
		firebase
			.firestore()
			.collection('users')
			.doc(comment.userId)
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
				setcommentOwner(pUser);
				// console.log(commentOwner.displayName)
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div id={comment.id} className="commentPane">
			<div className="comment">
				<div className="commentVotePane">
					<img
						src={commentOwner.photoURL}
						onError={defaultImage}
						alt="profile picture"
						className="profilePic"
					/>
					<div className="voteCommentPane">
						<button
							// onClick={}
							className="voteUpBTC"
						>
							<BiUpArrow size="25px" />
						</button>

						{comment.voteUp - comment.voteDown}

						<button
							// onClick={}
							className="voteDownBTC"
						>
							<BiDownArrow size="25px" />
						</button>
					</div>
				</div>

				<div className="commentInfo">
					<div className="postBy">
						<p className="displayName">
							{commentOwner.displayName}
						</p>
						{/* <p className="username">@{comment.userId}</p> */}
						<p className="timestamp">
							{' '}
							-{' '}
							{new Date(comment.timeStamp).toLocaleString([], {
								dateStyle: 'long',
								timeStyle: 'short',
							})}
						</p>
					</div>
					<div className="postContent">
						<p>{parse(comment.content)}</p>
						{/* แสดง Post */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentCard;
