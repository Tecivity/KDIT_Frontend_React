//React
import React, { useState, useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import { MdCancel } from 'react-icons/md';
//Components
import { SessionApi } from '../../hook/SessionApi';
import Post from '../PostCard/Post';
import FileUpload from '../../firebase/FileUpload';
//Firebase
import firebase from '../../firebase';
import './index.css';

const FullSubCom = ({ subCom, update }) => {
	//States
	const [edit, setEdit] = useState(false);
	const [posts, setPosts] = useState([]);
	const [photoURL, setPhotoURL] = useState('');
	const [bannerURL, setBannerURL] = useState('');
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')

	//Contexts
	const { defaultBanner, userInfo, user } = useContext(SessionApi);

	//Functions
	const handleOnClick = () => {
		setEdit(!edit);
	};

	// const clearInput = () => {
	// 	setSubCom({ name: '', description: '' });
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		const newSubCom = {
			name,
			description,
			bannerURL,
			photoURL,
		}
		update(newSubCom);
	};

	const getPost = (id) => {
		const postsArray = [];
		firebase
			.firestore()
			.collection('posts')
			.where('subComUID', '==', id)
			.onSnapshot((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					postsArray.push({ id: doc.id, ...doc.data() });
				});
				setPosts(postsArray);
			});
	};

	const fetchData = async () => {
		if (subCom.id) {
			getPost(subCom.id)
			setName(subCom.name);
			setDescription(subCom.description);
			setBannerURL(subCom.bannerURL);
			setPhotoURL(subCom.photoURL);
			console.log(subCom);
		}
	};

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div className="fullComPane">
			<div className="comInfoPane">
				<div className="bannerImgPane">
					<img
						src={subCom.bannerURL || defaultBanner}
						onError={defaultBanner}
						alt=""
						className="bannerImg"
					/>
				</div>
				<div className="subComImagePane">
					<img src={subCom.photoURL} alt="" className="subComImg" />
				</div>
				<h2 style={{ marginBottom: '0' }}>{subCom.name}</h2>
				<p>{subCom.description}</p>
				<button className="subcom-btn">Follow</button>

				{userInfo.id == subCom.ownerUID ? (
					<>
						<Popup
							trigger={
								<button
									className="editCombtn"
									onClick={handleOnClick}
								>
									Edit
								</button>
							}
							modal
							className="subPopup"
						>
							{(close) => (
								<div className="modal">
									<div className="close" onClick={close}>
										<MdCancel
											size="30px"
											style={{ fill: '#f48c51' }}
										/>
									</div>
									<div className="header">
										<h1
											style={{
												paddingBottom: '0.5rem',
												borderBottom:
													'1px solid lightgrey',
											}}
										>
											Edit Community
										</h1>
									</div>
									<div className="content">
										<div className="fullsubcomForm">
											<form action="">

												<div
													className="editSubComForm"
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
													className="editSubComForm"
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



												<div className="inputForm">
													<label htmlFor="">
														Community Name
													</label>
													<input
														type="text"
														name="name"
														className="nameInput"
														value={name}
														onChange={(e) =>
															setName(e.target.value)
														}
													/>
													<label htmlFor="">
														Description
													</label>
													<textarea
														id=""
														cols="30"
														rows="10"
														name="description"
														className="desInput"
														value={description}
														onChange={(e) =>
															setDescription(e.target.value)
														}
													></textarea>
												</div>
												<button
													onClick={handleSubmit}
													className="btn"
												>
													Save
												</button>
											</form>
										</div>
									</div>
								</div>
							)}
						</Popup>
					</>
				) : (
					<></>
				)}
			</div>
			<div className="fullComCard">
				{/* <PostForm updatePost={updatePost} /> */}
				<div className="content">
					{posts.map((post, i) => (
						<Post key={i} post={post} />
					))}
				</div>
			</div>
		</div>
	);
};

export default FullSubCom;
