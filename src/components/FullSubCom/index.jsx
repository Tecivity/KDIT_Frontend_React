//React
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { MdCancel, MdEdit, MdDelete, MdReportProblem } from 'react-icons/md';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { GoCheck } from 'react-icons/go';
import useDropdownMenu from 'react-accessible-dropdown-menu-hook';

//Components
import { SessionApi } from '../../hook/SessionApi';
import Post from '../PostCard/Post';
import FileUpload from '../../firebase/FileUpload';
//Firebase
import firebase from '../../firebase';
import './index.css';
import { SubComService, UserService } from '../../services';

import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import { store } from 'react-notifications-component';
import 'animate.css';

const FullSubCom = ({ subCom, update }) => {
	//Variables
	const { buttonProps, itemProps, isOpen, setIsOpen } = useDropdownMenu(1);

	//States
	const [posts, setPosts] = useState([]);
	const [photoURL, setPhotoURL] = useState('');
	const [bannerURL, setBannerURL] = useState('');
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [isFollow, setIsFollow] = useState(false);
	const [subComData, setSubComData] = useState({});
	const [subComDummy, setSubComDummy] = useState({});
	const [voteNumber, setVoteNumber] = useState();
	const [isEdited, setIsEdited] = useState(false);
	const [hover, setHover] = useState(false);
	const [nameLen, setNameLen] = useState(0);
	const [desLen, setDesLen] = useState(0);

	//Contexts
	const { session, defaultBanner, userInfo, authListener } = useContext(
		SessionApi,
	);

	//History
	const history = useHistory();

	//Functions
	const handleOnClick = () => {
		// setIsEdited(false);
		setNameLen(name.length);
		setDesLen(description.length);
	};

	const checkNameLen = (e) => {
		const max_len = 20;
		setNameLen(e.target.value.length);
		if (e.target.value.length < max_len) {
			setName(e.target.value);
		}
	};

	const checkDesLen = (e) => {
		const max_len = 250;
		setDesLen(e.target.value.length);
		if (e.target.value.length < max_len) {
			setDescription(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		setIsEdited(true);
		e.preventDefault();
		const newSubCom = {
			...subComDummy,
			name,
			description,
			bannerURL,
			photoURL,
		};
		update(newSubCom);
		store.addNotification({
			title: 'Your Community is updated successfully!',
			message:
				'Yeah! your change that you made to your sub-community is now on our server.',
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
			window.location.reload();
		}, 3000);
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
			setSubComDummy(subCom);
			setName(subCom.name);
			setDescription(subCom.description);
			setBannerURL(subCom.bannerURL);
			setPhotoURL(subCom.photoURL);
			setVoteNumber(subCom.totalFollow.length);
			setSubComData({
				value: subCom.id,
				label: subCom.name,
			});
			getPost(subCom.id);
			try {
				const listSubCom = userInfo.mySubCom;
				if (
					listSubCom.some(
						(listSubCom) => listSubCom['value'] == subCom.id,
					)
				) {
					setIsFollow(true);
				}
			} catch (err) {
				UserService.updateUser(userInfo.id, { mySubCom: [] });
			}
		}
	};

	const followOnClick = async () => {
		const newFollowList = [...userInfo.mySubCom];
		const newTotalFollow = subComDummy.totalFollow;
		if (isFollow) {
			newFollowList.pop(subComData);
			newTotalFollow.pop(userInfo.id);
		} else {
			newFollowList.push(subComData);
			newTotalFollow.push(userInfo.id);
		}
		console.log(newFollowList);
		console.log(newTotalFollow);
		// setIsFollow(!isFollow)

		SubComService.updateSubCom(subCom.id, {
			totalFollow: newTotalFollow,
		}).then(() => {
			console.log('update totalFollow success');
			SubComService.getSubCom(subCom.id).then((data) => {
				setSubComDummy(data);
				setVoteNumber(data.totalFollow.length);
				console.log('update totalFollow success');
			});
		});
		UserService.updateUser(userInfo.id, { mySubCom: newFollowList }).then(
			() => {
				setIsFollow(!isFollow);
				authListener();
			},
		);
		if (!isFollow) {
			store.addNotification({
				title: 'You successfully followed this sub-community!',
				message:
					'You will receive the post from this sub-community from now on.',
				type: 'success',
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
			store.addNotification({
				title:
					'You successfully unfollowed this sub-community.',
				message:
					'Sorry that you have to go. You will not receive the content form this sub-community from now on',
				type: 'danger',
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
		}
	};

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
						onError={(e) => {
							e.src = defaultBanner;
						}}
						alt=""
						className="bannerImg"
						style={{ background: 'white' }}
					/>
				</div>
				<div className="subComImagePane">
					<img
						src={
							subCom.photoURL ||
							'https://cdn.jeab.com/wp-content/uploads/2020/03/wallpaper-for-jeab06.jpg'
						}
						alt=""
						className="subComImg"
						style={{ background: 'white' }}
					/>
				</div>
				<h2 style={{ marginBottom: '0', textAlign: 'center' }}>
					{subCom.name}
				</h2>
				<p
					style={{
						fontSize: '0.8rem',
						display: 'inline',
						color: 'grey',
						margin: '0',
					}}
				>
					{voteNumber} Members
				</p>

				<p>{subCom.description}</p>
				{session ? (
					isFollow ? (
						<>
							<button
								className="subcom-btnf"
								onClick={followOnClick}
								onMouseOver={() => setHover(true)}
								onMouseLeave={() => setHover(false)}
							>
								<GoCheck
									size="30px"
									style={{
										fill: hover ? 'white' : '#f48c51',
									}}
								/>
							</button>
						</>
					) : (
						<>
							<button
								className="subcom-btn"
								onClick={followOnClick}
							>
								Follow
							</button>
						</>
					)
				) : (
					<div>
						Please{' '}
						<span
							onClick={() => history.push('/auth')}
							style={{ textDecoration: 'underline' }}
						>
							Login
						</span>{' '}
						To Follow Community
					</div>
				)}

				{userInfo.id == subCom.ownerUID ? (
					<>
						<Popup
							trigger={
								<button
									className="editCombtn"
									onMouseOver={handleOnClick}
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
													src={
														photoURL ||
														'https://cdn.jeab.com/wp-content/uploads/2020/03/wallpaper-for-jeab06.jpg'
													}
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
													src={
														bannerURL ||
														defaultBanner
													}
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
														checkNameLen(e)
													}
													style={{
														marginBottom: '0',
													}}
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
														checkDesLen(e)
													}
													style={{
														marginBottom: '0',
													}}
												></textarea>
												<p
													style={{
														color: 'grey',
														fontSize: '0.8rem',
														marginTop: '0',
													}}
												>
													{desLen}/250
												</p>
											</div>
											{!isEdited && (
												<button
													onClick={handleSubmit}
													className="btn"
													// onClick={close}
												>
													<a
														style={{
															color: 'white',
														}}
													>
														Save
													</a>
												</button>
											)}
										</div>
									</div>
								</div>
							)}
						</Popup>

						<button className="editCombtn" onClick={handleOnClick}>
							Delete
						</button>
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
