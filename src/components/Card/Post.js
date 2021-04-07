import React, { useState, useEffect } from 'react';

const Post = ({ post, upVote, downVote }) => {
	//States
	const [posts, setPosts] = useState(post);

	//Function

	return (
		<>
			<div id={posts.id}>
				<hr />
				<ul>
					<li>{post.voteUp}</li>
					<li>{post.voteDown}</li>
				</ul>
				<button onClick={() => upVote(post.id)}>Vote</button>
				<button onClick={() => downVote(post.id)}>Devote</button>
				<h1>{post.content}</h1>
				<p>by {post.userid}</p>
				<p>{post.timeStamp}</p>
				<hr />
			</div>
		</>
	);
};

export default Post;
