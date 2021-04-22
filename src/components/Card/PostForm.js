import React, { useState, useEffect, useContext } from 'react';
import { SessionApi } from '../../hook/SessionApi';
import { Link } from 'react-router-dom';
import profilePic from '../../assets/Test.jpg';

const PostForm = ({ updatePost }) => {
	const { user } = useContext(SessionApi);
	const defaultImage = 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg'
	const [imageURL, setImageURL] = useState(user.photoURL)
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
			console.log(e.target.value);
			e.target.value = '';
		}
	};
	return (
		<>
			{session ? (
				<div className="postFormBox">
					<div>
						<img src={imageURL}
							onError={() => setImageURL(defaultImage)}
							alt="profile picture"
							className="profilePic" />
					</div>
					<div className="postForm">
						<div className="postText">
							<textarea
								name=""
								id=""
								cols="30"
								rows="5"
								placeholder="What's going on today"
								name="content"
								onChange={handleChange}
							></textarea>
							<div className="postOption">
								<button>Upload Picture/Video</button>
								<button>Event</button>
								<button>Reviews</button>
								<button
									onClick={handleClick}
									className="postBT"
								>
									Post
								</button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<div>
					<h1 class="loginWarn">Please Login to Create Post</h1>
				</div>
			)}
		</>
	);
};

export default PostForm;
