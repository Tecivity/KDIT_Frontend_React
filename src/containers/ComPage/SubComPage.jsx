//React
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { MdCancel } from 'react-icons/md';
//Components
import { Navbar, SubComBox, SideNavbar, SubComForm } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
//External
import HashLoader from 'react-spinners/HashLoader';
//CSS
import './ComPage.css';
import userService from '../../services/user.service';

const SubComPage = () => {
	//Variables
	const ref = firebase.firestore().collection('sub_community');
	// const auth = firebase.auth();

	//States
	const [subComs, setSubComs] = useState([]);
	const [showCreate, setShowCreate] = useState(false);

	//Effects
	useEffect(() => {
		fetchData();
		authListener();
	}, []);

	//Contexts
	const { session, authListener, loading, user } = React.useContext(
		SessionApi,
	);

	//Functions
	const firebaseTest = async () => {
		userService
			.getUser(user.uid)
			.then((data) => {
				// console.log(data.mySubCom.includes('kdR5zUidEkhQGhpcBup4'));
				// const testList = data.mySubCom;
				// console.log(testList.push('test'));
				// console.log(testList);
				// console.log(testList.pop('test'));
				// console.log(testList);
				const isNewUser = data.isNewUser;
				// console.log(isNewUser);
				if (!data.isNewUser) {
					throw 'not found inNewUser';
				}
			})
			.catch((err) => {
				userService
					.updateUser(user.uid, { isNewUser: false })
					.then(() => {
						// console.log(err);
					});
			});

		// firebase
		// 	.firestore()
		// 	.collection('users')
		// 	.doc(user.uid)
		// 	.get()
		// 	.then((doc) => {
		// 		const obj = {id:doc.id, ...doc.data()}
		// 		console.log(obj.mySubCom)
		// 	})
		// 	.catch((err) => {
		// 		return err
		// 	});
	};

	const fetchData = async () => {
		const subComsArray = [];
		ref.onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				subComsArray.push({ id: doc.id, ...doc.data() });
			});
			setSubComs(subComsArray);
		});
	};

	const handleShowCreate = () => {
		setShowCreate(!showCreate);
	};

	//Render
	return (
		<>
			<Navbar />
			<div className="com-pane">
				{loading ? (
					<div className="auth-loading">
						<HashLoader
							className="auth-loading"
							color={'#272727'}
							loading={loading}
							size={100}
						/>
					</div>
				) : (
					<div>
						{session ? (
							<>
								<div className="myCom">
									<div className="myComInfo">
										<Popup
											trigger={
												<button
													className="createComBtn"
													onClick={handleShowCreate}
													style={{
														marginTop: '1.5rem',
														marginLeft: 'auto',
														marginBottom: '0',
													}}
												>
													Create
												</button>
											}
											modal
											className="com-popup"
										>
											{(close) => (
												<div className="modal">
													<div
														className="close"
														onClick={close}
													>
														<MdCancel
															size="30px"
															style={{
																fill: '#f48c51',
															}}
														/>
													</div>

													<SubComForm />
												</div>
											)}
										</Popup>
									</div>
								</div>
								<div className="ourCom">
									{subComs.map((subCom, i) => {
										return (
											<SubComBox
												key={i}
												subCom={subCom}
											/>
										);
									})}
								</div>
							</>
						) : (
							<h1>Please Login to Follow our Sub-Community</h1>
						)}
					</div>
				)}
				{/* <button onClick={firebaseTest}>????</button> */}
			</div>
			<SideNavbar />
		</>
	);
};

export default SubComPage;
