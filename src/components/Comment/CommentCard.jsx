//React
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiUpArrow, BiDownArrow } from 'react-icons/bi';
import { MdCancel, MdEdit, MdDelete } from 'react-icons/md';
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
	const [edit, setEdit] = useState(false);
	const [newComment, setNewComment] = useState(parse(comment.content));

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

	const handleEditComment = () => {
		setEdit(!edit);
	};

	const handleChangeComment = (e) => {
		setNewComment(e.target.value);
	};

	const handleSubmitComment = () => {};

	const handleDeleteComment = () => {};

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
						<h4 style={{ margin: '0' }}>
							{comment.voteUp - comment.voteDown}
						</h4>

						<button
							// onClick={}
							className="voteDownBTC"
						>
							<BiDownArrow size="25px" />
						</button>
					</div>
				</div>

				<div className="commentInfo">
					<div className="commentBy">
						<p
							className="displayName"
							style={{ fontWeight: '700', marginRight: '0.5rem' }}
						>
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
						<button className="editCommentBtn">
							{edit ? (
								<MdCancel
									size="20px"
									style={{
										marginLeft: 'auto',
										fill: '#f48c51',
									}}
									onClick={handleEditComment}
								/>
							) : (
								<MdEdit
									size="20px"
									style={{
										marginLeft: 'auto',
										fill: '#f48c51',
									}}
									onClick={handleEditComment}
								/>
							)}
						</button>
						<button
							onClick={handleDeleteComment}
							className="delCommentBtn"
						>
							<MdDelete
								size="20px"
								style={{ marginLeft: 'auto', fill: '#f48c51' }}
							/>
						</button>
					</div>
					<div className="postContent">
						{edit && (
							<div className="editCommentPane">
								<textarea
									name=""
									id=""
									cols="30"
									rows="10"
									className="editCommentArea"
									onChange={handleChangeComment}
								></textarea>
								<button
									className="saveComment"
									onClick={handleSubmitComment}
								>
									Save
								</button>
							</div>
						)}
						<p>{parse(comment.content)}</p>
						{/* แสดง Post */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CommentCard;
