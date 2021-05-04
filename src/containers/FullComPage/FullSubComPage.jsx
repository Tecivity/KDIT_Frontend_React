//React
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//Components
import { Navbar, SideNavbar, FullSubCom } from '../../components';
//Firebase
import firebase from '../../firebase';

const FullSubComPage = () => {
	//States
	const [subCom, setSubCom] = useState({});

	//Params
	const { id } = useParams();

	//Functios
	const fetchData = async () => {
		firebase
			.firestore()
			.collection('sub_community')
			.doc(id)
			.get()
			.then((doc) => {
				setSubCom({ id: doc.id, ...doc.data() });
			})
			.then(() => {
				console.log('fetch subcom success');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const update = async (newSubCom) => {
		firebase
			.firestore()
			.collection('sub_community')
			.doc(id)
			.update(newSubCom)
			.then(() => {
				console.log('Update subcom success');
				setSubCom(newSubCom);
			});
	};

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Render
	return (
		<div>
			<Navbar />
			<FullSubCom subCom={subCom} update={update} />
			<SideNavbar />
		</div>
	);
};

export default FullSubComPage;
