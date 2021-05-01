//React
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MdCancel, MdEdit, MdDelete } from 'react-icons/md';
//Components
import { BiUpArrow, BiDownArrow, BiCommentDetail } from 'react-icons/bi';
import Comment from '../Comment/index';
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import { User } from '../../firebase/models';
import MyUploadAdapter from '../../firebase/ckeditor_image_firebase';
import { PostService } from '../../services';
//External
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
//CSS
import './index.css';

const FullPost = ({ post, id }) => {
	//States
	const [newPost, setNewPost] = useState('');
	const [postUser, setPostUser] = useState('');
	const [totalComment, setTotalComment] = useState(0);

	//Effects
	useEffect(() => {
		fetchData();
		console.log(postUser.photoURL);
	}, [post]);

	//Contexts
	const { session, user, loading } = useContext(SessionApi);

	//History
	const history = useHistory();

	//Functions
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
		PostService.deletePost(post.id).then(() => {
			history.push(`/`);
		});
	};

	const fetchData = async () => {
		firebase
			.firestore()
			.collection('users')
			.doc(post.userUID)
			.get()
			.then((doc) => {
				setPostUser({ id: doc.id, ...doc.data() });
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
									onClick={()=>history.push(`/profile/${postUser.id}`)}
								/>
							</div>

							<div className="full-postInfo">
								<div className="full-postBy">
									<p className="full-displayName">
										{postUser.displayName}
									</p>
									<p className="timestamp">
										{' '}
										•{' '}
										{new Date(
											post.timeStamp,
										).toLocaleString([], {
											dateStyle: 'long',
											timeStyle: 'short',
										})}
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
												size="25px"
												style={{ fill: '#f48c51' }}
											/>
										) : (
											<MdEdit
												size="25px"
												style={{ fill: '#f48c51' }}
											/>
										)}
									</button>
									{post.userUID == user.uid && (
										<button
											onClick={deletePost}
											className="editPostBtn"
										>
											<MdDelete
												size="25px"
												style={{ fill: '#f48c51' }}
											/>
										</button>
									)}
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
