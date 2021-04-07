import React, { useState, useEffect } from 'react';
import { SessionApi } from '../../hook/SessionApi';
import { Link } from 'react-router-dom';

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

	//Contexts
	const { session } = React.useContext(SessionApi);

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
			{session ? (
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
			) : (
				<div>
					<h1>Please Login to Create Post</h1>
					<Link to="/auth">Login Here</Link>
				</div>
			)}
		</>
	);
};

export default PostForm;
