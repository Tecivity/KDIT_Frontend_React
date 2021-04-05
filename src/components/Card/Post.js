import React, { useState, useEffect } from 'react';

const Post = ({ post }) => {
	//States
	const [posts, setPosts] = useState(post);

	//Function

	return (
		<>
			<div>
				<hr />
				<ul>
					<li>{post.voteUp}</li>
					<li>{post.voteDown}</li>
				</ul>
				<h1>{post.content}</h1>
				<p>by {post.userid}</p>
				<p>{post.timeStamp}</p>
				<hr />
			</div>
		</>
	);
};

export default Post;
