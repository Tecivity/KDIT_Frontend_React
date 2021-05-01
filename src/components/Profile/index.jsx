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

const Profile = ({ id }) => {
	//States
	const [edit, setEdit] = useState(false);
	const [posts, setPosts] = useState([]);
	const [photoURL, setPhotoURL] = useState('');
	const [bannerURL, setBannerURL] = useState('');
	const [displayName, setDisplayName] = useState('');
	const [bio, setBio] = useState('');
	const [profile, setProfile] = useState({});

	//Contexts
	const { user, defaultImage, defaultBanner } = useContext(SessionApi);

	//Functions

	const updateProfile = (e) => {
		e.preventDefault();
		const newProfile = {
			displayName,
			bannerURL,
			photoURL,
			bio,
		};
		console.log(profile);
		console.log(newProfile);
		UserService.updateUser(profile.id, newProfile).then((result) => {
			console.log('Updated data');
			setProfile({ ...profile, displayName, bannerURL, photoURL, bio });
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
						<h3
							style={{
								marginTop: '0',
								color: 'grey',
								fontWeight: '200',
							}}
						>
							@username
						</h3>
						<p style={{ marginTop: '0' }}>{profile.bio}</p>
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
										<div className="editProfilePane">
											<div className="editProfileForm">
												<label htmlFor="">
													Profile Picture
												</label>

												<FileUpload
													url={photoURL}
													setUrl={setPhotoURL}
												/>

												<label htmlFor="">
													Banner Picture
												</label>

												<FileUpload
													url={bannerURL}
													setUrl={setBannerURL}
												/>

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
												/>

												<label htmlFor="">Bio</label>
												<input
													type="text"
													name="displayNames"
													value={bio}
													onChange={(e) =>
														setBio(e.target.value)
													}
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
