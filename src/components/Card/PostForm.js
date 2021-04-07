import React, { useState, useEffect } from 'react';

const PostForm = ({ updatePost }) => {
	//States
	const [post, setPost] = useState({
		content: '',
		timeStamp: '',
		userid: '',
		id: '',
		voteUp: 0,
		voteDown: 0,
	});

	//Functions
	const handleChange = (e) => {
		const value = e.target.value;
		const name = e.target.name;
		setPost({ ...post, [name]: value });
		console.log(post);
	};

	const handleClick = (e) => {
		if (post.content) {
			const newPost = {
				...post,
				timeStamp: new Date().toString(),
				userid: 'Default User',
				id: new Date().getTime().toString(),
			};
			updatePost(newPost);
			console.log(newPost);
		}
	};
	return (
		<>
			<div>
				<textarea
					name=""
					id=""
					cols="30"
					rows="10"
					placeholder="What's going on today"
					name="content"
					onChange={handleChange}
				></textarea>
				<button onClick={handleClick}>Post</button>
			</div>
		</>
	);
};

export default PostForm;
