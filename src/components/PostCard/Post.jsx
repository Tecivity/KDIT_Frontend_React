//React
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiUpArrow, BiDownArrow, BiCommentDetail } from 'react-icons/bi';

//Components
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import { CommentService, PostService, UserService } from '../../services';
//External
import parse from 'html-react-parser';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';

TimeAgo.addLocale(en);

const Post = ({ post, upVote, downVote }) => {
	//Variables
	const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';

	//States
	const [postUser, setPostUser] = useState('');
	const [totalComment, setTotalComment] = useState(0);

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Context
	const { session, user, loading, setLoading } = useContext(SessionApi);

	//History
	const history = useHistory();

	//Functions
	const handlePostClick = () => {
		console.log('post clicked');
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

	const fetchData = async () => {
		UserService.getUser(post.userUID).then((data) => {
			setPostUser(data);
		});
		CommentService.getCommentSize(post.id).then((data) => {
			setTotalComment(data);
		});
	};

	return (
		<div id={post.id} className="postPane">
			<div>
				<div className="post" onClick={handlePostClick}>
					<div onClick={handlePostClick}>
						<img
							src={postUser.photoURL}
							onError={defaultImage}
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
								Community
							</p>
						</div>
						<div className="postContent" onClick={handlePostClick}>
							<p>{parse(post.content)}</p>
						</div>
					</div>
				</div>
			</div>

			<div className="infoPane">
				<div className="votePane">
					<div onClick={() => upVote} className="voteUpBT">
						<BiUpArrow size="25px" />
					</div>

					<h4 style={{ margin: '0' }}>
						{/* {post.voteUp.length - post.voteDown.length}{' '} */}
					</h4>

					<div onClick={() => downVote} className="voteDownBT">
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
