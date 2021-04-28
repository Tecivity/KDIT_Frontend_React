import React, { useState, useEffect } from 'react';
import './index.css';

const FullSubCom = ({ subCom }) => {
	//States
	const [edit, setEdit] = useState(false);

	useEffect(() => {
		console.log(subCom);
	}, []);

	//Functions
	const handleOnClick = () => {
		setEdit(!edit);
	};

	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		// setSubCom({ ...subcom, [name]: value });
	};

	const clearInput = () => {
		// setSubCom({ name: '', description: '' });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// if (subcom.name && subcom.description) {
		// 	firebase
		// 		.firestore()
		// 		.collection('sub_community')
		// 		.add({
		// 			...subcom,
		// 			ownerUID: user.uid,
		// 			photoURL:
		// 				'https://cdn.jeab.com/wp-content/uploads/2020/03/wallpaper-for-jeab06.jpg',
		// 			totalFollow: 0,
		// 		})
		// 		.then(() => {
		// 			e.target.value = '';
		// 			clearInput();
		// 			window.location.reload();
		// 		});
		// }
	};

	return (
		<div className="fullComPane">
			<div className="comInfoPane">
				<div className="subComImagePane">
					<img src={subCom.photoURL} alt="" className="subComImg" />
				</div>
				<h2>{subCom.name}</h2>
				<p>{subCom.description}</p>
				<button className="subcom-btn">Follow</button>
				<button className="edit-btn" onClick={handleOnClick}>
					{edit ? 'X' : 'Edit'}
				</button>
				{edit && (
					<>
						<div className="fullsubcomForm">
							<form action="">
								<label htmlFor="">Community Picture</label>
								<h1>Upload Picture Here</h1>
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
									Save
								</button>
							</form>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default FullSubCom;
