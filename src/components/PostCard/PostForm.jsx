//React
import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
//Components
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import MyUploadAdapter from '../../firebase/ckeditor_image_firebase';
//External
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BiFontSize } from 'react-icons/bi';

const PostForm = ({ updatePost }) => {
	//Variables
	const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
	const [data, setData] = useState([]);
	const [selectedData, setSelectedData] = useState();

	//Contexts
	const { session, user, userInfo } = useContext(SessionApi);

	//States
	const [imageURL, setImageURL] = useState(userInfo.photoURL);
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

	const handleChange = (e) => {
		setSelectedData(e);
		console.log(selectedData);
	};

	//Effects
	useEffect(() => {
		setImageURL(userInfo.photoURL);
		setData(userInfo.mySubCom);
	}, [userInfo]);

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
		if (!selectedData) {
			return alert('please select subcom');
		}
		if (post.content) {
			const newPost = {
				...post,
				timeStamp: currentDate() + 'T' + currentTime(),
				userUID: user.uid,
				subComUID: selectedData.value,
			};
			firebase
				.firestore()
				.collection('posts')
				.add(newPost)
				.then(() => {
					updatePost(newPost);
					e.target.value = '';
					clearInput();
					// window.location.reload();
				});
		}
	};

	return (
		<>
			{session ? (
				<div className="postFormBox">
					<div className="postForm-profile">
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
								toolbar: [
									'heading',
									'|',
									'bold',
									'italic',
									'blockQuote',
									'link',
									'numberedList',
									'imageUpload',
									'mediaEmbed',
									'|',
									'undo',
									'redo',
								],
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
						<script src="../../ckeditor5/build/ckeditor.js">
							ClassicEditor
						</script>
						<div className="postText">
							<div className="postOption">
								<div className="selectCom">
									<Select
										options={data}
										value={selectedData}
										onChange={handleChange}
										placeholder="Select Community..."
									/>
								</div>
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
					<h1 className="loginWarn">Please Login to Create Post</h1>
				</div>
			)}
		</>
	);
};

export default PostForm;
