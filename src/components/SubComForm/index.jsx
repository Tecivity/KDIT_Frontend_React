//React
import React, { useState, useContext } from 'react';
//Components
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import FileUpload from '../../firebase/FileUpload';
//CSS
import './index.css';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import 'animate.css';

const SubComForm = () => {
	//States
	const [subcom, setSubCom] = useState({
		name: '',
		description: '',
		ownerUID: '',
		photoURL: '',
	});
	const [photoURL, setPhotoURL] = useState('');
	const [bannerURL, setBannerURL] = useState('');
	const [isrCreated, setIsCreated] = useState(false);

	//Context
	const { user, defaultBanner } = useContext(SessionApi);

	//Functions
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setSubCom({ ...subcom, [name]: value });
	};

	const clearInput = () => {
		setSubCom({ name: '', description: '' });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (subcom.name && subcom.description) {
			firebase
				.firestore()
				.collection('sub_community')
				.add({
					...subcom,
					ownerUID: user.uid,
					photoURL:
						photoURL ||
						'https://cdn.jeab.com/wp-content/uploads/2020/03/wallpaper-for-jeab06.jpg',
					totalFollow: 0,
					bannerURL: bannerURL || defaultBanner,
				})
				.then(() => {
					setIsCreated(true);
					e.target.value = '';
					clearInput();
					store.addNotification({
						title: 'Your Community is created successfully!',
						message: 'Yeah! Your community is now on our server.',
						type: 'success',
						insert: 'top',
						container: 'bottom-full',
						animationIn: ['animate__animated', 'animate__fadeIn'],
						animationOut: ['animate__animated', 'animate__fadeOut'],
						dismiss: {
							duration: 8000,
							onScreen: true,
							pauseOnHover: true,
						},
					});
					setTimeout(function () {
						setIsCreated(false);
						window.location.reload();
					}, 3000);
				});
		}
	};

	return (
		<>
			<div className="subcomForm">
				<div className="header">
					<h1
						style={{
							paddingBottom: '0.5rem',
							borderBottom: '1px solid lightgrey',
							textAlign: 'center',
						}}
					>
						Create Community
					</h1>
				</div>
				<div className="subComForm-imgPane">
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							borderBottom: '1px solid lightgrey',
						}}
					>
						<h2>Community Picture</h2>
						<FileUpload url={photoURL} setUrl={setPhotoURL} />

						<img
							src={photoURL}
							alt=""
							className="full-editProfilePic"
							draggable="false"
						/>
					</div>

					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							borderBottom: '1px solid lightgrey',
						}}
					>
						<h2>Community Banner</h2>
						<FileUpload url={bannerURL} setUrl={setBannerURL} />

						<img
							src={bannerURL}
							alt=""
							className="full-editBannerPic"
							draggable="false"
							style={{
								marginBottom: '2rem',
							}}
						/>
					</div>
				</div>
				<form action="">
					<div className="inputForm">
						<label htmlFor="">Community Name</label>
						<input
							type="text"
							name="name"
							className="nameInput"
							placeholder="What's Your Community Name?"
							onChange={(e) => handleChange(e)}
						/>
						<label htmlFor="">Description</label>
						<textarea
							id=""
							cols="30"
							rows="10"
							name="description"
							className="desInput"
							placeholder="Write something about your community..."
							onChange={(e) => handleChange(e)}
						></textarea>
					</div>
					{!isrCreated && (
						<button onClick={handleSubmit} className="btn">
							Create
						</button>
					)}
				</form>
			</div>
		</>
	);
};

export default SubComForm;
