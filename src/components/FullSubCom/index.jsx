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
import { UserService } from '../../services';

const FullSubCom = ({ subCom, update }) => {
	//States
	const [edit, setEdit] = useState(false);
	const [posts, setPosts] = useState([]);
	const [photoURL, setPhotoURL] = useState('');
	const [bannerURL, setBannerURL] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [isFollow, setIsFollow] = useState(false)
	const [subComData, setSubComData] = useState({})

	//Contexts
	const { defaultBanner, userInfo, authListener } = useContext(SessionApi);

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
			...subCom,
			name,
			description,
			bannerURL,
			photoURL,
		};
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
			setName(subCom.name);
			setDescription(subCom.description);
			setBannerURL(subCom.bannerURL);
			setPhotoURL(subCom.photoURL);
			setSubComData({
				value: subCom.id,
				label: subCom.name,
			})
			getPost(subCom.id);
			console.log(posts)
			try{
				const listSubCom = userInfo.mySubCom
				if (listSubCom.some(listSubCom=>listSubCom['value'] == subCom.id)) {
				setIsFollow(true)
				}
			}catch(err){
				UserService.updateUser(userInfo.id,{mySubCom:[]})
			}
			
		}
	};

	const followOnClick = async () => {
		const newFollowList = [...userInfo.mySubCom]
		if(isFollow){
			newFollowList.pop(subComData)
		}else{
			newFollowList.push(subComData)
		}
		console.log(newFollowList)
		// setIsFollow(!isFollow)
		UserService.updateUser(userInfo.id,{mySubCom:newFollowList}).then(()=>{
			setIsFollow(!isFollow)
			authListener()
		})
	}

	//Effects
	useEffect(() => {
		fetchData();
	}, [subCom]);

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
				{isFollow ? (
					<>
						<button className="subcom-btn" onClick={followOnClick}>Followed</button>
					</>
				) : (
					<>
						<button className="subcom-btn" onClick={followOnClick}>Follow</button>
					</>
				)}


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
							className="comPopup"
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
											<div className="editSubComForm">
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
													style={{
														marginBottom: '2rem',
													}}
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
														setDescription(
															e.target.value,
														)
													}
												></textarea>
											</div>
											<button
												onClick={handleSubmit}
												className="btn"
											>
												<a
													onClick={close}
													style={{
														color: 'white',
													}}
												>
													Save
												</a>
											</button>
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
