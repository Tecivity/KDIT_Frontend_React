import React, { useState } from 'react';
import './index.css';

const Profile = () => {
	//States
	const [edit, setEdit] = useState(false);

	//Functions
	const handleOnClick = () => {
		setEdit(!edit);
	};

	return (
		<div className="profilePane">
			<h1>Profile Pic HERE</h1>
			<h2>Name Here</h2>
			<h3>Bio ต้องมีมั้ยนิ้</h3>
			<button onClick={handleOnClick}>Edit</button>
			{edit && (
				<div className="editProfilePane">
					<form action="" className="editProfileForm">
						<label htmlFor="">Profile Picture</label>
						<h1>Upload Pic Here</h1>
						<label htmlFor="">Display Name</label>
						<input type="text" name="displayNames" />
						<label htmlFor="">Username</label>
						<input type="text" name="username" />
						<button className="btn">Save Changes</button>
					</form>
				</div>
			)}
			<h3>User's POsts HERE</h3>
		</div>
	);
};

export default Profile;
