import React, { useState } from 'react';
import profilePic from '../../assets/Test.jpg';
import Comment from '../Comment/index';
import './index.css';

const FullPost = ({ post, upVote, downVote }) => {
	//States
	const [posts, setPosts] = useState(post);

	return (
		<div className="fullPane">
			<div id={posts.id} className="full-postPane">
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
								src={profilePic}
								alt="full-profile picture"
								className="full-profilePic"
							/>
						</div>

						<div className="full-postInfo">
							<div className="full-postBy">
								<p className="full-displayName">Display Name</p>
								<p className="full-username">@{post.userid}</p>
								<p className="full-timestamp">
									{' '}
									- {post.timeStamp}
								</p>
							</div>
							<h1>{post.content}</h1>
						</div>
					</div>
				</div>
			</div>
			{/* Comments */}
			<div className="commentPane">
				<Comment />
			</div>
		</div>
	);
};

export default FullPost;
