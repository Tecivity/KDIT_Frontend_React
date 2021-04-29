import React, { useState, useContext } from 'react';
import './index.css';
import { SessionApi } from '../../hook/SessionApi';
import firebase from '../../firebase'

const Profile = () => {
	const { user, defaultImage } = useContext(SessionApi);
	//States
	const [edit, setEdit] = useState(false);

	const storage = firebase.storage()
	const [image, setImage] = useState(null)
	const [url, setUrl] = useState("")
	const [progress, setProgress] = useState(0)
	const [path, setPath] = useState('')

	const handleChange = e => {
		if (e.target.files[0]) {
			setImage(e.target.files[0])
			console.log(e.target.files[0])
		}
	}

	const handleUpload = e => {
		e.preventDefault()
		const uploadTask = storage.ref(`images/${image.name}`).put(image)
		uploadTask.on(
			"state_changed",
			snapshot => {
				const progress = Math.round(
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100
				)
				setProgress(progress)
			},
			error => {
				console.log(error)
			},
			() => {
				storage
					.ref("images")
					.child(image.name)
					.getDownloadURL()
					.then(url => {
						console.log(url)
						setUrl(url)
					})
			}
		)
	}

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
								<div className="componentBox">
									<h1>Upload picture</h1>
									<br />
									<progress value={progress} max="100" />
									<br />
									<input type="file" onChange={handleChange} />
									<button onClick={handleUpload}>Upload</button>
									<br />
									{(url !== "") ? (<a href={url}>Click me</a>) : (<h3>upload something</h3>)}
									<br />
									<img src={url || "http://via.placeholder.com/400"} alt="firebase-image" width="400px" />

								</div>
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
