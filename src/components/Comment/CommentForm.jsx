//React
import React, { useState, useContext } from 'react';
//Components
import { SessionApi } from '../../hook/SessionApi';
import { CommentService } from '../../services';

const CommentForm = ({ post, id }) => {
	//States
	const [comment, setComment] = useState('');

	//Contexts
	const { user } = useContext(SessionApi);

	//Functions
	const handleOnChange = (e) => {
		setComment(e.target.value);
	};

	function currentDate() {
		const d = new Date();
		var month = '' + (d.getMonth() + 1);
		var day = '' + d.getDate();
		var year = d.getFullYear();

		if (day.length < 2) day = '0' + day;
		if (month.length < 2) month = '0' + month;

		return [year, month, day].join('-');
	}

	function currentTime() {
		const d = new Date();
		var hour = '' + d.getHours();
		var minute = '' + d.getMinutes();

		if (hour.length < 2) hour = '0' + hour;
		if (minute.length < 2) minute = '0' + minute;

		return [hour, minute].join(':');
	}
	const handleSubmit = (e) => {
		if (comment.trim() === '') {
			console.log({ error: 'Must not be empty' });
		} else {
			//Submit Comment
			const newComment = {
				content: comment,
				postUID: id,
				subComUID: post.subComUID,
				timeStamp: currentDate() + 'T' + currentTime(),
				userUID: user.uid,
				voteDown: 0,
				voteUp: 0,
			};
			CommentService.addComment(newComment).then((data) => {
				console.log(data);
				setComment('');
				window.location.reload();
			});
		}
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
					value={comment}
				></textarea>
				<button className="postCommentBtn" onClick={handleSubmit}>
					Comment
				</button>
			</div>
		</div>
	);
};

export default CommentForm;
