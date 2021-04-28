import React, { useState } from 'react';
import './index.css';

const CommentForm = () => {
	//States
	const [comment, setComment] = useState('');

	//Functions
	const handleOnChange = (e) => {
		setComment(e.target.value);
	};

	const handleSubmit = () => {
		//Submit Comment
	};

	return (
		<div>
			<div className="commentForm">
				<textarea
					name=""
					id=""
					cols="30"
					rows="5"
					placeholder="What's Your Thought About This..."
					className="commentTextarea"
					onChange={handleOnChange}
				></textarea>
				<button className="postCommentBtn" onClick={handleSubmit}>
					Post
				</button>
			</div>
		</div>
	);
};

export default CommentForm;
