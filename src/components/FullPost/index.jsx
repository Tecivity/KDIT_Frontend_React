//React
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { MdCancel, MdEdit, MdDelete, MdReportProblem } from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';
import Popup from 'reactjs-popup';
//Components
import { BiUpArrow, BiDownArrow, BiCommentDetail } from 'react-icons/bi';
import Comment from '../Comment/index';
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import { User } from '../../firebase/models';
import MyUploadAdapter from '../../firebase/ckeditor_image_firebase';
import { CommentService, PostService, UserService } from '../../services';
//External
import parse from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
//CSS
import './index.css';
import 'reactjs-popup/dist/index.css';

TimeAgo.addLocale(en);

const FullPost = ({ post, id }) => {
	//States
	const [newPost, setNewPost] = useState('');
	const [postUser, setPostUser] = useState('');
	const [totalComment, setTotalComment] = useState(0);
	const [edit, setEdit] = useState(false);

	const [postDummy, setPostDummy] = useState();
	const [voteUpNum, setVoteUpNum] = useState(0);
	const [voteDownNum, setVoteDownNum] = useState(0);

	//Contexts
	const { session, user, loading, userInfo } = useContext(SessionApi);

	//History
	const history = useHistory();

	//DropDown Menu
	const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);

	const upVote = async () => {
		const voteUpList = postDummy.voteUp;
		const voteDownList = postDummy.voteDown;
		if (voteDownList.includes(userInfo.id)) {
			voteDownList.pop(userInfo.id);
			voteUpList.push(userInfo.id);
			PostService.updatePost(post.id, {
				voteUp: voteUpList,
				voteDown: voteDownList,
			}).then(() => {
				PostService.getPost(post.id).then((data) => {
					setPostDummy(data);
					setVoteUpNum(data.voteUp.length);
					setVoteDownNum(data.voteDown.length);
				});
			});
		} else if (voteUpList.includes(userInfo.id)) {
			voteUpList.pop(userInfo.id);
			PostService.updatePost(post.id, { voteUp: voteUpList }).then(() => {
				PostService.getPost(post.id).then((data) => {
					setPostDummy(data);
					setVoteUpNum(data.voteUp.length);
				});
			});
		} else {
			voteUpList.push(userInfo.id);
			PostService.updatePost(post.id, { voteUp: voteUpList }).then(() => {
				PostService.getPost(post.id).then((data) => {
					setPostDummy(data);
					setVoteUpNum(data.voteUp.length);
				});
			});
		}
	};

	const downVote = async () => {
		const voteUpList = postDummy.voteUp;
		const voteDownList = postDummy.voteDown;
		if (voteUpList.includes(userInfo.id)) {
			voteDownList.push(userInfo.id);
			voteUpList.pop(userInfo.id);
			PostService.updatePost(post.id, {
				voteUp: voteUpList,
				voteDown: voteDownList,
			}).then(() => {
				PostService.getPost(post.id).then((data) => {
					setPostDummy(data);
					setVoteUpNum(data.voteUp.length);
					setVoteDownNum(data.voteDown.length);
				});
			});
		} else if (voteDownList.includes(userInfo.id)) {
			voteDownList.pop(userInfo.id);
			PostService.updatePost(post.id, { voteDown: voteDownList }).then(
				() => {
					PostService.getPost(post.id).then((data) => {
						setPostDummy(data);
						setVoteDownNum(data.voteDown.length);
					});
				},
			);
		} else {
			voteDownList.push(userInfo.id);
			PostService.updatePost(post.id, { voteDown: voteDownList }).then(
				() => {
					PostService.getPost(post.id).then((data) => {
						setPostDummy(data);
						setVoteDownNum(data.voteDown.length);
					});
				},
			);
		}
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
		try {
			setPostDummy(post);
			setVoteUpNum(post.voteUp.length);
			setVoteDownNum(post.voteDown.length);
			UserService.getUser(post.userUID).then((data) => {
				setPostUser(data);
			});
			CommentService.getCommentSize(post.id).then((data) => {
				setTotalComment(data);
			});
		} catch (err) {
			console.log(err);
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
				fetchData();
			});
	};

	//Effects
	useEffect(() => {
		fetchData();
	}, [post]);

	return (
		<div className="fullPane">
			<div id={post.id} className="full-postPane">
				<div className="full-infoPane">
					<div className="full-votePane">
						<button onClick={upVote} className="full-voteUpBT">
							<BiUpArrow size="25px" />
						</button>

						<h4 style={{ margin: '0' }}>
							{voteUpNum - voteDownNum}
						</h4>
						<button onClick={downVote} className="full-voteDownBT">
							<BiDownArrow size="25px" />
						</button>
					</div>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<h3>{totalComment}</h3>
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
								onClick={() =>
									history.push(`/profile/${postUser.id}`)
								}
							/>
						</div>

						<div className="full-postInfo">
							<div>
								<div className="full-postBy">
									<p className="full-displayName">
										{postUser.displayName}
									</p>
									<p className="timestamp">
										{' '}
										•{' '}
										{String(post.timeStamp) !==
											'undefined' && (
											<ReactTimeAgo
												date={String(post.timeStamp)}
												locale="en-US"
												style={{ color: 'grey' }}
											/>
										)}
										<span
											style={{
												fontSize: '0.8rem',
												color: 'lightgrey',
											}}
										>
											{' '}
											-{' '}
											{new Date(
												post.timeStamp,
											).toLocaleString([], {
												dateStyle: 'long',
												timeStyle: 'short',
											})}
										</span>
									</p>
								</div>
								<div>
									<p
										style={{
											marginTop: '0.2rem',
											fontSize: '1rem',
											color: 'grey',
											textDecoration: 'underline',
										}}
									>
										Community
									</p>
								</div>
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
												onReady={(editor, config) => {
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
												onChange={(event, editor) => {
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
						<div className="reportBtPane">
							<button {...buttonProps} className="reportBt">
								{isOpen ? (
									<IoIosArrowUp size="25px" />
								) : (
									<IoIosArrowDown size="25px" />
								)}
							</button>
							<div
								className={isOpen ? 'visible' : ''}
								role="menu"
							>
								{post.userUID === user.uid ? (
									<div>
										<button
											onClick={editPost}
											className="reportBt"
										>
											{edit ? (
												<MdCancel
													size="25px"
													style={{
														fill: '#f48c51',
													}}
												/>
											) : (
												<MdEdit
													size="25px"
													style={{
														fill: '#f48c51',
													}}
												/>
											)}
										</button>
										{post.userUID == user.uid && (
											<button
												onClick={deletePost}
												className="reportBt"
											>
												<MdDelete
													size="25px"
													style={{
														fill: '#f48c51',
													}}
												/>
											</button>
										)}
									</div>
								) : (
									<div></div>
								)}
							</div>

							<Popup
								trigger={
									<button
										className={
											isOpen ? 'reportBt' : 'reportBtHide'
										}
									>
										<MdReportProblem
											size="25px"
											style={{ fill: '#f48c51' }}
										/>
									</button>
								}
								modal
								className="subPopup"
							>
								{(close) => (
									<div className="modal">
										<div className="close" onClick={close}>
											<MdCancel
												size="30px"
												style={{ fill: '#f48c51' }}
											/>
										</div>
										<div className="header">
											<h1>Report</h1>
										</div>
										<div className="content">
											<div className="reportPane">
												<h3
													style={{
														marginTop: '0',
														borderBottom:
															'1px solid grey',
													}}
												>
													Please Inform Your Reason
													For Reporting This Post
												</h3>
												<div>
													<label htmlFor="">
														<input
															type="checkbox"
															name="Abuse"
															id=""
															value="reason1"
														/>
														Reason 1
														<span class="checkmark"></span>
													</label>
												</div>
												<div>
													<label htmlFor="">
														<input
															type="checkbox"
															name="Abuse"
															id=""
															value="reason1"
														/>
														Reason 1
														<span class="checkmark"></span>
													</label>
												</div>
												<div>
													<label htmlFor="">
														<input
															type="checkbox"
															name="Abuse"
															id=""
															value="reason1"
														/>
														Reason 1
														<span class="checkmark"></span>
													</label>
												</div>
												<div
													style={{
														marginTop: '1rem',
													}}
												>
													<h3
														style={{
															marginTop: '0',
															borderBottom:
																'1px solid grey',
														}}
													>
														Additional Reason
													</h3>
													<textarea
														name=""
														id=""
														cols="30"
														rows="10"
														style={{
															resize: 'none',
															width: '100%',
														}}
													></textarea>
												</div>
												<button className="postCommentBtn">
													Report
												</button>
											</div>
										</div>
									</div>
								)}
							</Popup>
						</div>
					</div>
				</div>
			</div>
			{/* Comments */}
			<div className="commentPane">
				<Comment post={post} id={id} />
			</div>
		</div>
	);
};

export default FullPost;
