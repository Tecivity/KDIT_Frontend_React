import React, { useState, useContext } from 'react';
import './index.css';
import { SessionApi } from '../../hook/SessionApi';

const Profile = () => {
	const { user, defaultImage } = useContext(SessionApi);
	//States
	const [edit, setEdit] = useState(false);

	//Functions
	const handleOnClick = () => {
		setEdit(!edit);
	};

	return (
		<>
			<div className="profilePane">
				<div className="profileInfoPane">
					<div className="bannerImgPane">
						<img
							src="https://images7.alphacoders.com/110/thumbbig-1104854.jpg"
							alt=""
							className="bannerImg"
						/>
					</div>
					<img
						src={user.photoURL}
						onError={defaultImage}
						alt="profile picture"
						className="full-profilePic"
					/>
					<h2 style={{ marginTop: '0', marginBottom: '0rem' }}>
						{user.displayName}
					</h2>
					<h3
						style={{
							marginTop: '0',
							color: 'grey',
							fontWeight: '200',
						}}
					>
						@username
					</h3>
					<p style={{ marginTop: '0' }}>Bio ต้องมีมั้ยนิ้</p>
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
				</div>

				<button className="edit-btn" onClick={handleOnClick}>
					{edit ? 'X' : 'Edit'}
				</button>
			</div>
		</>
	);
};

export default Profile;
