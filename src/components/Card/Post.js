import React, { useState, useEffect } from 'react';
import profilePic from '../../components/Test.jpg';

const Post = ({ post, upVote, downVote }) => {
	//States
	const [posts, setPosts] = useState(post);

	//Function

	return (
		<>
			<div id={posts.id} className="postPane">
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
							<h1>{post.content}</h1>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Post;
