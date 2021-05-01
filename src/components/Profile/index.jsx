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

const Profile = ({id}) => {
	//States
	const [edit, setEdit] = useState(false);
	const [posts, setPosts] = useState([]);
	const [photoURL, setPhotoURL] = useState('');
	const [bannerURL, setBannerURL] = useState('')
	const [displayName, setDisplayname] = useState('')
	const [bio, setBio] = useState('')
	const [profile ,setProfile] = useState({})

	//Contexts
	const { user, defaultImage, defaultBanner } = useContext(SessionApi)

	//Functions

	const updateProfile = e => {
		e.preventDefault() 
	}

	const handleOnClick = () => {
		setEdit(!edit);
	};

	const fetchData = async () => {

		UserService.getUser(id).then(data=>{
			setProfile(data)
			getPost(data.id)
		})
		
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
	}

	//Effects
	useEffect(() => {
		fetchData();
	}, [profile,posts]);

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
						<p style={{ marginTop: '0' }}>{profile.bio}</p>
					</div>
					<div style={{ alignSelf: 'center' }}>
						{/* <button className="edit-btn" onClick={handleOnClick}>
							{edit ? 'X' : 'Edit'}
						</button> */}
					</div>
						{profile.id == user.uid ? <Popup
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
											/>

											<button className="btn" onClick={updateProfile}>
												Save Changes
											</button>
										</form>
									</div>
								</div>
							</div>
						)}
					</Popup> : <></>}
					
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
