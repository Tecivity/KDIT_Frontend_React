//React
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiUpArrow, BiDownArrow, BiCommentDetail } from 'react-icons/bi';

//Components
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import {
	CommentService,
	PostService,
	SubComService,
	UserService,
} from '../../services';
//External
import parse from 'html-react-parser';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import 'animate.css';

TimeAgo.addLocale(en);

const Post = ({ post }) => {
	//Variables
	const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';

	//States
	const [postUser, setPostUser] = useState('');
	const [totalComment, setTotalComment] = useState(0);
	const [postDummy, setPostDummy] = useState();
	const [voteUpNum, setVoteUpNum] = useState(0);
	const [voteDownNum, setVoteDownNum] = useState(0);
	const [isVoteUp, setIsVoteup] = useState(false);
	const [isVoteDown, setIsVoteDown] = useState(false);
	const [subComName, setSubComName] = useState('');

	//Effects
	useEffect(() => {
		fetchData();
	}, [post]);

	//Context
	const { userInfo, loading, setLoading, user } = useContext(SessionApi);

	//History
	const history = useHistory();

	//Functions
	const handlePostClick = () => {
		history.push(`/post/${post.id}`);
	};

	const deletePost = () => {
		if (!window.confirm('Are you sure for delete post ❓')) {
			return console.log('Cancel delete.');
		}
		PostService.deletePost(post.id).then(() => {
			window.location.reload();
		});
	};

	const check = async () => {
		if (postDummy.voteUp.includes(userInfo.id)) {
			setIsVoteup(true);
			setIsVoteDown(false);
		} else if (postDummy.voteDown.includes(userInfo.id)) {
			setIsVoteup(false);
			setIsVoteDown(true);
		}
	};

	const upVote = async () => {
		const voteUpList = postDummy.voteUp;
		const voteDownList = postDummy.voteDown;
		if (voteDownList.includes(userInfo.id)) {
			voteDownList.pop(userInfo.id);
			voteUpList.push(userInfo.id);
			setIsVoteDown(false);
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

		if (voteUpList.includes(userInfo.id)) {
			setIsVoteup(true);
			setIsVoteDown(false);
			store.addNotification({
				title: 'You vote up this post.',
				message:
					'Keep support good content creators to make our world a better place!',
				type: 'success',
				insert: 'top',
				container: 'bottom-right',
				animationIn: ['animate__animated', 'animate__flipInX'],
				animationOut: ['animate__animated', 'animate__zoomOut'],
				dismiss: {
					duration: 8000,
					onScreen: true,
					pauseOnHover: true,
				},
			});
		} else {
			setIsVoteup(false);
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

		if (voteDownList.includes(userInfo.id)) {
			setIsVoteDown(true);
			setIsVoteup(false);
			store.addNotification({
				title: 'You vote down this post.',
				message: 'Thank you for keeping our platform a better place.',
				type: 'danger',
				insert: 'top',
				container: 'bottom-right',
				animationIn: ['animate__animated', 'animate__flipInX'],
				animationOut: ['animate__animated', 'animate__zoomOut'],
				dismiss: {
					duration: 8000,
					onScreen: true,
					pauseOnHover: true,
				},
			});
		} else {
			setIsVoteDown(false);
		}
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
			SubComService.getSubCom(post.subComUID).then((data) => {
				setSubComName(data.name);
			});
		} catch {
			console.log('err');
		}
	};

	return (
		<div id={post.id} className="postPane">
			<div>
				<div className="post" onClick={handlePostClick}>
					<div onClick={handlePostClick}>
						<img
							src={
								typeof postUser.photoURL === 'string' ||
								postUser.photoURL instanceof String
									? postUser.photoURL
									: defaultImage
							}
							alt="profile picture"
							className="profilePic"
							onClick={() =>
								history.push(`/profile/${postUser.id}`)
							}
						/>
					</div>

					<div className="postInfo" onClick={handlePostClick}>
						<div className="postBy">
							<p className="displayName">
								{postUser.displayName}
							</p>
							<p className="timestamp">
								{' '}
								•{' '}
								{String(post.timeStamp) !== 'undefined' && (
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
									{new Date(post.timeStamp).toLocaleString(
										[],
										{
											dateStyle: 'long',
											timeStyle: 'short',
										},
									)}
								</span>
							</p>
						</div>
						<div>
							<p
								style={{
									marginTop: '0',
									fontSize: '0.8rem',
									color: 'grey',
									textDecoration: 'underline',
								}}
							>
								{subComName}
							</p>
						</div>
						<div className="postContent" onClick={handlePostClick}>
							<div>{parse(post.content)}</div>
						</div>
					</div>
				</div>
			</div>

			<div className="infoPane">
				<div className="votePane">
					<div
						onClick={upVote}
						className="voteUpBT"
						style={{
							background: isVoteUp ? '#c5ffae' : 'none',
						}}
					>
						<BiUpArrow size="25px" />
					</div>

					<h4 style={{ margin: '0' }}>
						{voteUpNum - voteDownNum || 0}
					</h4>

					<div
						onClick={downVote}
						className="voteDownBT"
						style={{
							background: isVoteDown ? '#ffaeae' : 'none',
						}}
					>
						<BiDownArrow size="25px" />
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
					}}
				>
					<div className="post-commentBtn" onClick={handlePostClick}>
						<h4 style={{ margin: '0' }}>{totalComment}</h4>
						<BiCommentDetail
							size="25px"
							style={{ marginLeft: '0.5rem' }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Post;
