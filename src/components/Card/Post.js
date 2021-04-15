import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import profilePic from '../../components/Test.jpg';

const Post = ({ post, upVote, downVote }) => {
	//States
	const [posts, setPosts] = useState(post);

	//Function
	const handlePostClick = () => {
		console.log('post clicked');
	};

	return (
		<Link
			to={{
				pathname: `/post/${posts.id}`,
				state: posts,
			}}
			style={{ textDecoration: 'none' }}
		>
			<div id={posts.id} className="postPane" onClick={handlePostClick}>
				<div className="infoPane">
					<div className="votePane">
						<button
							onClick={() => upVote(post.id)}
							className="voteUpBT"
						>
							⬆
						</button>

						{post.voteUp}

						<button
							onClick={() => downVote(post.id)}
							className="voteDownBT"
						>
							⬇
						</button>
					</div>
					<p>Comments</p>
					<p>Re-post</p>
				</div>

				<div>
					<div className="post">
						<div>
							<img
								src={profilePic}
								alt="profile picture"
								className="profilePic"
							/>
						</div>

						<div className="postInfo">
							<div className="postBy">
								<p className="displayName">Display Name</p>
								<p className="username">@{post.userid}</p>
								<p className="timestamp"> - {post.timeStamp}</p>
							</div>
							<div className="postContent">
								<p>{post.content}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Post;
