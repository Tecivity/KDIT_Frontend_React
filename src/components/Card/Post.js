import React, { useState, useEffect } from 'react';

const Post = ({ post, upVote, downVote }) => {
	//States
	const [posts, setPosts] = useState(post);

	//Function

	return (
		<>
			<div id={posts.id} className="postPane">
				
				<ul className="votePane">
					<li className="voteNum">{post.voteUp}<button onClick={() => upVote(post.id)} className="voteBT">⬆</button></li>
					
					<li className="voteNum">{post.voteDown}<button onClick={() => downVote(post.id)} className="voteBT">⬇</button></li>
					
				</ul>
				
				
				<h1>{post.content}</h1>
				<p>by {post.userid}</p>
				<p>{post.timeStamp}</p>
				
			</div>
		</>
	);
};

export default Post;
