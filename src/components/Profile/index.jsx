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
import { getSuggestedQuery } from '@testing-library/dom';
import { PostService, UserService } from '../../services';
import 'react-image-crop/dist/ReactCrop.css';
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import "animate.css";

const Profile = ({ id }) => {
	//States
	const [edit, setEdit] = useState(false);
	const [posts, setPosts] = useState([]);
	const [photoURL, setPhotoURL] = useState('');
	const [bannerURL, setBannerURL] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [bio, setBio] = useState('');
	const [profile, setProfile] = useState({});
	const [mouseDown, setMouseDown] = useState(false);

	//Contexts
	const { user, defaultImage, defaultBanner } = useContext(SessionApi);

	//Functions

	const updateProfile = (e) => {
		const newProfile = {
			displayName,
			bannerURL,
			photoURL,
			bio,
		};
		console.log(profile);
		console.log(newProfile);
		console.log(photoURL);
		UserService.updateUser(profile.id, newProfile).then((result) => {
			console.log('Updated data');
			setProfile({ ...profile, displayName, bannerURL, photoURL, bio });
			store.addNotification({
				title: "Please Insert The Story In The Editor.",
				message:
				  "We can't let you write an empty story! Please insert the story that you want to share.",
				type: "warning",
				insert: "top",
				container: "bottom-right",
				animationIn: ["animate__animated", "animate__flash"],
				animationOut: ["animate__animated", "animate__zoomOut"],
				dismiss: {
				  duration: 8000,
				  onScreen: true,
				  pauseOnHover: true,
				},
			  });
		});
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
		fetchData();
	}, []);

	return (
		<>
			<div className="profilePane">
				{console.disableRedBox = true}
				<div className="bannerImgPane">
					<img
						src={profile.bannerURL || defaultBanner}
						onError={defaultBanner}
						alt=""
						className="bannerImg"
					/>
				</div>
				<div className="profileInfoPane">
					<div>
						<img
							src={profile.photoURL || defaultImage}
							onError={defaultImage}
							alt="profile picture"
							className="full-profilePic"
						/>
						<h2 style={{ marginTop: '0', marginBottom: '0rem' }}>
							{profile.displayName}
						</h2>

						<p style={{ marginTop: '0', color: 'grey' }}>
							{profile.bio}
						</p>
					</div>
					<div style={{ alignSelf: 'center' }}>
						{/* <button className="edit-btn" onClick={handleOnClick}>
							{edit ? 'X' : 'Edit'}
						</button> */}
					</div>
					{profile.id == user.uid ? (
						<Popup
							trigger={
								<button
									className="edit-btn"
									onClick={handleOnClick}
								>
									{edit ? 'X' : 'Edit'}
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

											<label htmlFor="">
												Display Name
											</label>
											<input
												type="text"
												name="displayNames"
												value={displayName}
												onChange={(e) =>
													setDisplayName(
														e.target.value,
													)
												}
												className="editInput"
											/>

											<label htmlFor="">Bio</label>
											<input
												type="text"
												name="displayNames"
												value={bio}
												onChange={(e) =>
													setBio(e.target.value)
												}
												className="editInput"
											/>

											<button
												className="btn"
												onClick={updateProfile}
											>
												<a
													onClick={close}
													style={{
														color: 'white',
													}}
												>
													Save Changes
												</a>
											</button>
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
					{/* <PostForm updatePost={updatePost} /> */}
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
