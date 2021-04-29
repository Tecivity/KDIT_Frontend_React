import React, { useState, useContext } from 'react';
import './index.css';
import firebase from '../../firebase'
import { SessionApi } from '../../hook/SessionApi'

const SubComForm = () => {
	const { user } = useContext(SessionApi)
	//States
	const [subcom, setSubCom] = useState({
		name: '',
		description: '',
		ownerUID: '',
		photoURL: ''
	});

	//Functions
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setSubCom({ ...subcom, [name]: value });
	};

	const clearInput = () => {
		setSubCom({ name: '', description: '' })
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (subcom.name && subcom.description) {
			firebase.firestore().collection('sub_community').add({
				...subcom,
				ownerUID: user.uid,
				photoURL: 'https://cdn.jeab.com/wp-content/uploads/2020/03/wallpaper-for-jeab06.jpg',
				totalFollow: 0
			}).then(() => {
				e.target.value = ''
				clearInput()
				window.location.reload()
			})
		}
	};

	return (
		<>
			<div className="subcomForm">
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