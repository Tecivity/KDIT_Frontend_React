//React
import React, { useState, useContext } from 'react';
//Components
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
//CSS
import './index.css';

const SubComForm = () => {
	//States
	const [subcom, setSubCom] = useState({
		name: '',
		description: '',
		ownerUID: '',
		photoURL: '',
	});

	//Context
	const { user, defaultBanner } = useContext(SessionApi);

	//Functions
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setSubCom({ ...subcom, [name]: value });
	};

	const clearInput = () => {
		setSubCom({ name: '', description: '' });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (subcom.name && subcom.description) {
			firebase
				.firestore()
				.collection('sub_community')
				.add({
					...subcom,
					ownerUID: user.uid,
					photoURL:
						'https://cdn.jeab.com/wp-content/uploads/2020/03/wallpaper-for-jeab06.jpg',
					totalFollow: [],
					bannerURL: defaultBanner,
				})
				.then(() => {
					e.target.value = '';
					clearInput();
					window.location.reload();
				});
		}
	};

	return (
		<>
			<div className="subcomForm">
				<div className="subComForm-imgPane">
					<h2>Upload Com Img HERE</h2>
					<h2>Upload Com Banner HERE</h2>
				</div>
				<form action="">
					<div className="inputForm">
						<label htmlFor="">Community Name</label>
						<input
							type="text"
							name="name"
							className="nameInput"
							placeholder="What's Your Community Name?"
							onChange={(e) => handleChange(e)}
						/>
						<label htmlFor="">Description</label>
						<textarea
							id=""
							cols="30"
							rows="10"
							name="description"
							className="desInput"
							placeholder="Write something about your community..."
							onChange={(e) => handleChange(e)}
						></textarea>
					</div>
					<button onClick={handleSubmit} className="btn">
						Create
					</button>
				</form>
			</div>
		</>
	);
};

export default SubComForm;
