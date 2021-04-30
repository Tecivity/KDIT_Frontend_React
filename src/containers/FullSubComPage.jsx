import React, { useEffect, useState } from 'react';
import { Navbar, Card, SideNavbar } from '../components';
import FullSubCom from '../components/FullSubCom';
import { useParams } from 'react-router-dom';
import firebase from '../firebase';
import { SubComModel } from '../firebase/models';

const FullSubComPage = () => {
	const { id } = useParams();
	const [subCom, setSubCom] = useState({})

	const fetchData = async () => {
		firebase
			.firestore()
			.collection('sub_community')
			.doc(id)
			.get()
			.then((doc) => {
				setSubCom({id:doc.id, ...doc.data()});
			})
			.then(()=>{
				console.log('fetch subcom success')
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
			.then(()=>{
				console.log('Update subcom success')
				window.location.reload()
			})
	}

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<Navbar />
			<FullSubCom subCom={subCom} update={update}/>
			<SideNavbar />
		</div>
	);
};

export default FullSubComPage;
