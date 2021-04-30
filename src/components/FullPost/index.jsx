import React, { useState, useEffect, useContext } from 'react';
import Comment from '../Comment/index';
import parse from 'html-react-parser';
import firebase from '../../firebase';
import './index.css';
import { User } from '../../firebase/models';
import { SessionApi } from '../../hook/SessionApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../../firebase/ckeditor_image_firebase';
import { BiUpArrow, BiDownArrow, BiCommentDetail } from 'react-icons/bi';
import { MdCancel, MdEdit } from 'react-icons/md';

const FullPost = ({ post, id }) => {
	const [postUser, setPostUser] = useState('');

	const { session, user, loading } = useContext(SessionApi);
	const [totalComment, setTotalComment] = useState(0);

	//States
	const [newPost, setNewPost] = useState('');

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
				console.log(postUser.photoURL);
			})
			.catch((err) => {
				console.log(err);
			});
		if (post.id) {
			firebase
				.firestore()
				.collection('comments')
				.where('postUID', '==', post.id)
				.get()
				.then((snap) => {
					setTotalComment(snap.size);
				});
		}
	};

	useEffect(() => {
		fetchData();
		console.log(postUser.photoURL);
	}, [post]);

	//Functions
	const editPost = () => {
		//Edit Post
		setEdit(!edit);
	};

	const saveChange = async (newContent) => {
		firebase
			.firestore()
			.collection('posts')
			.doc(post.id)
			.update({
				content: newPost,
			})
			.then(() => {
				console.log('Update post to firestore');
				window.location.reload();
			});
	};

	//States
	const [edit, setEdit] = useState(false);

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
								<BiUpArrow size="25px" />
							</button>

							{post.voteUp + post.voteDown}

							<button
								onClick={() => downVote(post)}
								className="full-voteDownBT"
							>
								<BiDownArrow size="25px" />
							</button>
						</div>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<h4>{totalComment}</h4>
							<BiCommentDetail
								size="25px"
								style={{ marginLeft: '0.5rem' }}
							/>
						</div>
					</div>

					<div>
						<div className="full-post">
							<div style={{ marginBottom: '1rem' }}>
								<img
									src={postUser.photoURL}
									alt="full-profile picture"
									className="fullprofilePic"
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
								<div className="full-postContent">
									{post.content ? (
										edit ? (
											<div className="editModePane">
												<CKEditor
													className="ckEditor"
													editor={ClassicEditor}
													data={post.content}
													config={{
														mediaEmbed: {
															previewsInData: true,
														},
													}}
													onReady={(
														editor,
														config,
													) => {
														// You can store the "editor" and use when it is needed.
														// console.log('Editor is ready to use!', editor);
														const data = editor.getData();
														setNewPost(data);
														if (editor) {
															editor.plugins.get(
																'FileRepository',
															).createUploadAdapter = (
																loader,
															) => {
																return new MyUploadAdapter(
																	loader,
																);
															};
														}
													}}
													onChange={(
														event,
														editor,
													) => {
														const data = editor.getData();
														// console.log({ event, editor, data });
														setNewPost(data);
													}}
												/>
												<button
													onClick={saveChange}
													className="savePostBtn"
												>
													{'Save Change'}
												</button>
											</div>
										) : (
											//Edit Post
											<p>{parse(post.content)}</p>
										)
									) : (
										<div></div>
									)}

									{/* แสดง Post */}
								</div>
							</div>
							{post.userUID === user.uid ? (
								<div>
									<button
										onClick={editPost}
										className="editPostBtn"
									>
										{edit ? (
											<MdCancel
												size="20px"
												style={{ fill: '#f48c51' }}
											/>
										) : (
											<MdEdit
												size="20px"
												style={{ fill: '#f48c51' }}
											/>
										)}
									</button>
								</div>
							) : (
								<div></div>
							)}
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
