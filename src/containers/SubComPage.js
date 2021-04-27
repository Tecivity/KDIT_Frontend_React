import React, { useState, useEffect } from 'react';
import { Navbar, SubComBox, SideNavbar, SubComForm } from '../components';
import { SessionApi } from '../hook/SessionApi';
import firebase from '../firebase';
import { SubComModel } from '../firebase/models';

const SubComPage = () => {
	const ref = firebase.firestore().collection('sub_community');
	const auth = firebase.auth();

	//States
	const [subComs, setSubComs] = useState([]);
	const [showCreate, setShowCreate] = useState(false);

	//Contexts
	const { session } = React.useContext(SessionApi);

	const firebaseTest = async () => {
		const data = await ref.doc('LmTGbTtE694gNj5UAE0').get();
		if (data.data()) {
			console.log(true);
		} else {
			console.log(false);
		}
	};

	const fetchData = async () => {
		const subComsArray = [];
		ref.onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				const subCom = new SubComModel(
					doc.id,
					doc.data().name,
					doc.data().description,
				);
				subComsArray.push(subCom);
			});
			setSubComs(subComsArray.reverse());
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	//Functions
	const handleShowCreate = () => {
		setShowCreate(!showCreate);
	};

	return (
		<>
			<Navbar />
			<div className="subcomPane">
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
											Follow our community or create your
											own
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
									return <SubComBox subCom={subCom} />;
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
			<SideNavbar />
		</>
	);
};

export default SubComPage;
