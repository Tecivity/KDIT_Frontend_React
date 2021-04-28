import React, { useState, useEffect } from 'react';
import { Navbar, SubComBox, SideNavbar } from '../components';
import { SessionApi } from '../hook/SessionApi';
import firebase from '../firebase'
import { SubComModel } from '../firebase/models';

const SubComPage = () => {
	const ref = firebase.firestore().collection('sub_community');
	const auth = firebase.auth()
	const [subComs, setSubComs] = useState([])

	//Contexts
	const { session } = React.useContext(SessionApi);

	const firebaseTest = async () => {
		const data = await ref.doc('LmTGbTtE694gNj5UAE0').get()
		if(data.data()){
			console.log(true)
		}else{
			console.log(false)
		}
		
	}

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

	return (
		<>
			<Navbar />
			<div className="subcomPane">
				{session ? (
					subComs.map((subCom) => {
						return <SubComBox subCom={subCom} />;
					})
				) : (
					<h1>Please Login to Follow our Sub-Community</h1>
				)}
				<button onClick={firebaseTest}>Test firebase</button>
			</div>
			<SideNavbar />
		</>
	);
};

export default SubComPage;
