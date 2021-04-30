import React, { useState, useEffect } from 'react';
import { Navbar, SubComBox, SideNavbar, SubComForm } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
import firebase from '../../firebase';
import { SubComModel } from '../../firebase/models';
import HashLoader from 'react-spinners/HashLoader';
import { UserService, PostService } from '../../services';
import './ComPage.css';

const SubComPage = () => {
	const ref = firebase.firestore().collection('sub_community');
	const auth = firebase.auth();

	//States
	const [subComs, setSubComs] = useState([]);
	const [showCreate, setShowCreate] = useState(false);

	//Contexts
	const {
		session,
		authListener,
		loading,
		userInfo,
		getUserInfo,
		user,
	} = React.useContext(SessionApi);

	const firebaseTest = async () => {
		getUserInfo(user.uid).then((data) => {
			console.log(data);
		});
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

	useEffect(() => {
		fetchData();
		authListener();
	}, []);

	//Functions
	const handleShowCreate = () => {
		setShowCreate(!showCreate);
	};

	return (
		<>
			<Navbar />
			<div className="subcomPane">
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
								<div className="mySubCom">
									<div className="mySubComTextPane">
										{showCreate ? (
											<SubComForm />
										) : (
											<>
												<h1>My Community</h1>
												<h2>Awwww</h2>
												<h3>
													Follow our community or
													create your own
												</h3>
											</>
										)}
									</div>
									<div className="btnPane">
										<button
											className="createSubComBtn"
											onClick={handleShowCreate}
										>
											{showCreate ? 'X' : 'Create'}
										</button>
									</div>
								</div>
								<div className="ourSubCom">
									<h1>Our Community</h1>
									<div>
										{subComs.map((subCom) => {
											return (
												<SubComBox subCom={subCom} />
											);
										})}
										<button onClick={firebaseTest}>
											Test firebase
										</button>
									</div>
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
