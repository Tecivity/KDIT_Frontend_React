//React
import React, { useState, useContext, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { MdCancel } from 'react-icons/md';
//Components
import { SessionApi } from '../../hook/SessionApi';
import Post from '../PostCard/Post';
//Firebase
import firebase from '../../firebase';
//External
import FileUpload from '../../firebase/FileUpload';
//CSS
import './index.css';
import { UserService } from '../../services';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import 'animate.css';

const Profile = ({ id }) => {
	//States
	const [edit, setEdit] = useState(false);
	const [posts, setPosts] = useState([]);
	const [photoURL, setPhotoURL] = useState('');
	const [bannerURL, setBannerURL] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [bio, setBio] = useState('');
	const [profile, setProfile] = useState({});
	const [showSave, setShowSave] = useState(true);
	const [nameLen, setNameLen] = useState(0);
	const [desLen, setDesLen] = useState(0);

	//Contexts
	const { user, defaultImage, defaultBanner } = useContext(SessionApi);

	//Functions
	const checkNameLen = (e) => {
		const max_len = 20;
		if (e.target.value.length < max_len) {
			setDisplayName(e.target.value);
		}
		if (e.target.value.length <= max_len) {
			setNameLen(e.target.value.length);
		}

		e.target.value = e.target.value.substr(0, max_len);
	};

	const checkDesLen = (e) => {
		const max_len = 100;
		if (e.target.value.length < max_len) {
			setBio(e.target.value);
		}
		if (e.target.value.length <= max_len) {
			setDesLen(e.target.value.length);
		}
		e.target.value = e.target.value.substr(0, max_len);
	};

	const updateProfile = (e) => {
		if (!displayName) {
			store.addNotification({
				title: 'Please enter your display name.',
				message: 'What do you call yourself?',
				type: 'warning',
				insert: 'top',
				container: 'bottom-right',
				animationIn: ['animate__animated', 'animate__flipInX'],
				animationOut: ['animate__animated', 'animate__zoomOut'],
				dismiss: {
					duration: 8000,
					onScreen: true,
					pauseOnHover: true,
				},
			});
		} else {
			if (!bio) {
				store.addNotification({
					title: 'Please enter your bio.',
					message: 'Let introduce you to other people!',
					type: 'warning',
					insert: 'top',
					container: 'bottom-right',
					animationIn: ['animate__animated', 'animate__flipInX'],
					animationOut: ['animate__animated', 'animate__zoomOut'],
					dismiss: {
						duration: 8000,
						onScreen: true,
						pauseOnHover: true,
					},
				});
			} else {
				const newProfile = {
					displayName,
					bannerURL,
					photoURL,
					bio,
				};
				console.log(profile);
				console.log(newProfile);
				console.log(photoURL);
				UserService.updateUser(profile.id, newProfile).then(
					(result) => {
						console.log('Updated data');
						setProfile({
							...profile,
							displayName,
							bannerURL,
							photoURL,
							bio,
						});
						store.addNotification({
							title:
								'Your profile is updated successfully! Please wait a moment for us to redirect you.',
							message:
								'Yeah! your change that you made to your profile is now on our server.',
							type: 'success',
							insert: 'top',
							container: 'bottom-full',
							animationIn: [
								'animate__animated',
								'animate__fadeIn',
							],
							animationOut: [
								'animate__animated',
								'animate__fadeOut',
							],
							dismiss: {
								duration: 5000,
								onScreen: true,
								pauseOnHover: true,
							},
						});
						setTimeout(function () {
							window.location.reload();
						}, 5000);
					},
				);
				setShowSave(false);
			}
		}
	};

	const handleOnClick = () => {
		setEdit(!edit);
	};

	const fetchData = async () => {
		UserService.getUser(id).then((data) => {
			setProfile(data);
			getPost(data.id);
			setDisplayName(data.displayName);
			setBio(data.bio);
			setBannerURL(data.bannerURL);
			setPhotoURL(data.photoURL);
		});
	};

	const getPost = (id) => {
		const postsArray = [];
		firebase
			.firestore()
			.collection('posts')
			.where('userUID', '==', id)
			.onSnapshot((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					postsArray.push({ id: doc.id, ...doc.data() });
				});
				setPosts(postsArray);
			});
	};

	//Effects
	useEffect(() => {
		console.log(id);
		fetchData();
	}, []);

	return (
		<>
			<div className="profilePane">
				{(console.disableRedBox = true)}
				<div className="bannerImgPane">
					<img
						src={profile.bannerURL || defaultBanner}
						alt=""
						className="bannerImg"
					/>
				</div>
				<div className="profileInfoPane">
					<div>
						<img
							src={profile.photoURL || defaultImage}
							alt="profile picture"
							className="full-profilePic"
							style={{ background: 'white' }}
						/>
						<h2 style={{ marginTop: '0', marginBottom: '0rem' }}>
							{profile.displayName}
						</h2>

						<p style={{ marginTop: '0', color: 'grey' }}>
							{profile.bio}
						</p>
					</div>
					{profile.id === user.uid ? (
						<Popup
							trigger={
								<button
									className="edit-btn"
									onClick={handleOnClick}
								>
									Edit
								</button>
							}
							modal
							className="editProfile"
						>
							{(close) => (
								<div className="modal">
									<div className="close" onClick={close}>
										<MdCancel
											size="30px"
											style={{ fill: '#f48c51' }}
										/>
									</div>

									<div className="content">
										<div className="editProfileForm">
											<div
												className="editProfileForm"
												style={{
													borderBottom:
														'2px solid lightgrey',
												}}
											>
												<h1 htmlFor="">
													Profile Picture
												</h1>

												<FileUpload
													url={photoURL}
													setUrl={setPhotoURL}
												/>

												<img
													src={photoURL}
													alt=""
													className="full-editProfilePic"
													draggable="false"
												/>
											</div>

											<div
												className="editProfileForm"
												style={{
													borderBottom:
														'2px solid lightgrey',
												}}
											>
												<h1 htmlFor="">
													Banner Picture
												</h1>

												<FileUpload
													url={bannerURL}
													setUrl={setBannerURL}
												/>

												<img
													src={bannerURL}
													alt=""
													className="full-editBannerPic"
													draggable="false"
												/>
											</div>

											<h3>Display Name</h3>
											<input
												type="text"
												name="displayNames"
												value={displayName}
												onChange={(e) =>
													checkNameLen(e)
												}
												className="editInput"
											/>
											<p
												style={{
													color: 'grey',
													fontSize: '0.8rem',
													marginTop: '0',
												}}
											>
												{nameLen}/20
											</p>

											<h3>Bio</h3>
											<input
												type="text"
												name="displayNames"
												value={bio}
												onChange={(e) => checkDesLen(e)}
												className="editInput"
											/>
											<p
												style={{
													color: 'grey',
													fontSize: '0.8rem',
													marginTop: '0',
												}}
											>
												{desLen}/100
											</p>

											{showSave && (
												<button
													className="btn"
													onClick={updateProfile}
													// onClick={close}
												>
													<p
														style={{
															color: 'white',
															margin: '2rem',
														}}
													>
														Save Changes
													</p>
												</button>
											)}
										</div>
									</div>
								</div>
							)}
						</Popup>
					) : (
						<></>
					)}
				</div>
				<div className="profileCard">
					<div className="content">
						{posts.map((post, i) => (
							<Post key={i} post={post} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
