import React, { useState } from 'react';
import './index.css';

const SubComForm = () => {
	//States
	const [subcom, setSubCom] = useState({ name: '', description: '' });

	//Functions
	const handleChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setSubCom({ ...subcom, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (subcom.name && subcom.description) {
			//Add to Firebase
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
							onChange={() => handleChange()}
						/>
						<label htmlFor="">Description</label>
						<textarea
							name=""
							id=""
							cols="30"
							rows="10"
							name="description"
							className="desInput"
							placeholder="Write something about your community..."
							onChange={() => handleChange()}
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
