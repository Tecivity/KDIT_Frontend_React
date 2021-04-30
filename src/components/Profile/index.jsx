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

const Profile = () => {
	//States
	const [edit, setEdit] = useState(false);
	const [posts, setPosts] = useState([]);
	const [url, setUrl] = useState('');

	//Contexts
	const { user, defaultImage, defaultBanner, userInfo } = useContext(
		SessionApi,
	);

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Functions
	const updatePost = () => {
		fetchData();
	};

	const handleOnClick = () => {
		setEdit(!edit);
	};

	const fetchData = async () => {
		const postsArray = [];
		firebase
			.firestore()
			.collection('posts')
			.where('userUID', '==', userInfo.id)
			.onSnapshot((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					postsArray.push({ id: doc.id, ...doc.data() });
				});
				setPosts(postsArray);
			});
	};

	return (
		<>
			<div className="profilePane">
				<div className="bannerImgPane">
					<img
						src={userInfo.bannerURL || defaultBanner}
						onError={defaultBanner}
						alt=""
						className="bannerImg"
					/>
				</div>
				<div className="profileInfoPane">
					<div>
						<img
							src={userInfo.photoURL || defaultImage}
							onError={defaultImage}
							alt="profile picture"
							className="full-profilePic"
						/>
						<h2 style={{ marginTop: '0', marginBottom: '0rem' }}>
							{user.displayName}
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
						<p style={{ marginTop: '0' }}>Bio ต้องมีมั้ยนิ้</p>
					</div>
					<div style={{ alignSelf: 'center' }}>
						{/* <button className="edit-btn" onClick={handleOnClick}>
							{edit ? 'X' : 'Edit'}
						</button> */}
					</div>

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
										<form
											action=""
											className="editProfileForm"
										>
											<label htmlFor="">
												Profile Picture
											</label>

											<FileUpload
												url={url}
												setUrl={setUrl}
											/>
											<label htmlFor="">
												Display Name
											</label>
											<input
												type="text"
												name="displayNames"
											/>

											<button className="btn">
												Save Changes
											</button>
										</form>
									</div>
								</div>
							</div>
						)}
					</Popup>
				</div>
				<div className="profileCard">
					{/* <PostForm updatePost={updatePost} /> */}
					<div className="content">
						{posts.map((post) => (
							<Post post={post} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
