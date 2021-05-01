//React
import React, { useState, useEffect, useContext } from 'react';
import Popup from 'reactjs-popup';
import { MdCancel } from 'react-icons/md';
//Components
import { SessionApi } from '../../hook/SessionApi';
import Post from '../PostCard/Post';
//Firebase
import firebase from '../../firebase';
import './index.css';

const FullSubCom = ({ subCom, update }) => {
	//States
	const [edit, setEdit] = useState(false);
	const [newSubCom, setNewSubCom] = useState({
		name: '',
		description: '',
		photoURL: '',
		bannerURL: '',
	});
	const [posts, setPosts] = useState([]);

	//Effects
	useEffect(() => {
		fetchData();
		setNewSubCom({
			name: subCom.name,
			description: subCom.description,
			photoURL: subCom.photoURL,
			bannerURL: subCom.bannerURL,
		});
		console.log(subCom);
	}, [subCom]);

	//Contexts
	const { defaultBanner, userInfo, user } = useContext(SessionApi);

	//Functions
	const handleOnClick = () => {
		setEdit(!edit);
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setNewSubCom({ ...newSubCom, [name]: value });
	};

	// const clearInput = () => {
	// 	setSubCom({ name: '', description: '' });
	// };

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(newSubCom);
		update(newSubCom);
	};

	const fetchData = async () => {
		if (subCom.id) {
			const postsArray = [];
			firebase
				.firestore()
				.collection('posts')
				.where('subComUID', '==', subCom.id)
				.onSnapshot((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						postsArray.push({ id: doc.id, ...doc.data() });
					});
					setPosts(postsArray);
				});
		}
	};

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
												<label htmlFor="">
													Community Picture
												</label>
												<h2>Upload Picture Here</h2>
												<div className="inputForm">
													<label htmlFor="">
														Community Name
													</label>
													<input
														type="text"
														name="name"
														className="nameInput"
														onChange={(e) =>
															handleChange(e)
														}
														value={newSubCom.name}
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
														onChange={(e) =>
															handleChange(e)
														}
														value={
															newSubCom.description
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
