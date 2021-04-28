import React,{useEffect,useState} from 'react';
import { Navbar, Card, SideNavbar } from '../components';
import FullSubCom from '../components/FullSubCom';
import { useParams } from 'react-router-dom';
import firebase from '../firebase';
import { SubComModel } from '../firebase/models';

const FullSubComPage = () => {
	const { id } = useParams();
	const [subCom,setSubCom] = useState({})

	const fetchData = async () => {
		firebase
			.firestore()
			.collection('sub_community')
			.doc(id)
			.get()
			.then((doc) => {
				const pSubCOm = new SubComModel(
					doc.id,
					doc.data().name,
					doc.data().description,
					doc.data().ownerUID,
					doc.data().photoURL,
					doc.data().totalFollow,
				);
				setSubCom(pSubCOm);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useEffect(() => {
		fetchData();
	}, []);

	return (
		<div>
			<Navbar />
			<FullSubCom subCom={subCom}/>
			<SideNavbar />
		</div>
	);
};

export default FullSubComPage;
