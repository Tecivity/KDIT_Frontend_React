import React, { useState, useEffect, useContext } from 'react';
import { SessionApi } from '../../hook/SessionApi';
import { Link, Switch } from 'react-router-dom';
import firebase from '../../firebase';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import MyUploadAdapter from '../../firebase/ckeditor_image_firebase';

const PostForm = ({ updatePost }) => {
	const { session, user } = useContext(SessionApi);
	const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
	const [imageURL, setImageURL] = useState(user.photoURL);

	//States
	const [post, setPost] = useState({
		content: '',
		subCom: '',
		subComUID: '',
		timeStamp: '',
		userUID: '',
		voteUp: 0,
		voteDown: 0,
	});
	const [show, setShow] = useState(true);

	//Functions
	const clearInput = () => {
		setPost({
			content: '',
			subCom: '',
			subComUID: '',
			timeStamp: '',
			userUID: '',
			voteUp: 0,
			voteDown: 0,
		});
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

	const handleClick = async (e) => {
		if (post.content) {
			const newPost = {
				...post,
				timeStamp: currentDate() + 'T' + currentTime(),
				userUID: user.uid,
				subCom: 'test Sub Com',
				subComUID: 'subcomUID',
			};
			firebase
				.firestore()
				.collection('posts')
				.add(newPost)
				.then(() => {
					updatePost();
					e.target.value = '';
					clearInput();
					window.location.reload();
				});
		}
	};

	useEffect(() => {
		setImageURL(user.photoURL);
	}, [user]);

	return (
		<>
			{session ? (
				<div className="postFormBox">
					<div>
						<img
							src={imageURL}
							onError={() => setImageURL(defaultImage)}
							alt="profile picture"
							className="form-profilePic"
						/>
					</div>

					<div className="postForm">
						<CKEditor
							className="ckEditor"
							editor={ClassicEditor}
							data="<p>What's going on today</p>"
							config={{
								mediaEmbed: {
									previewsInData: true,
								},
							}}
							onReady={(editor, config) => {
								if (editor) {
									editor.plugins.get(
										'FileRepository',
									).createUploadAdapter = (loader) => {
										return new MyUploadAdapter(loader);
									};
								}
							}}
							onChange={(event, editor) => {
								const data = editor.getData();
								setPost({
									...post,
									content: data,
								});
							}}
						/>
						<div className="postText">
							<div className="postOption">
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
