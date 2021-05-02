//React
import React, { useState, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { MdCancel } from 'react-icons/md';
//Components
import { Navbar, SubComBox, SideNavbar, SubComForm } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import { SubComModel } from '../../firebase/models';
//External
import HashLoader from 'react-spinners/HashLoader';
import { UserService, PostService } from '../../services';
//CSS
import './ComPage.css';
import parse from 'html-react-parser';
import userService from '../../services/user.service';

const SubComPage = () => {
	//Variables
	const ref = firebase.firestore().collection('sub_community');
	const auth = firebase.auth();

	//States
	const [subComs, setSubComs] = useState([]);
	const [showCreate, setShowCreate] = useState(false);

	//Effects
	useEffect(() => {
		fetchData();
		authListener();
	}, []);

	//Contexts
	const {
		session,
		authListener,
		loading,
		userInfo,
		getUserInfo,
		user,
	} = React.useContext(SessionApi);

	//Functions
	const firebaseTest = async () => {
		userService.getUser(user.uid).then((data) => {
			console.log(data.mySubCom.includes('kdR5zUidEkhQGhpcBup4'));
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
										<h2>My Community</h2>
										<Popup
											trigger={
												<button
													className="createComBtn"
													onClick={handleShowCreate}
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
									<div>Followed Sub Com HERE</div>
								</div>
								<div className="ourCom">
									{subComs.map((subCom,i) => {
										return <SubComBox key={i} subCom={subCom} />;
									})}
									<button onClick={firebaseTest}>
										Test firebase
									</button>
								</div>
							</>
						) : (
							<h1>Please Login to Follow our Sub-Community</h1>
						)}
					</div>
				)}
			</div>
			<SideNavbar />
		</>
	);
};

export default SubComPage;
