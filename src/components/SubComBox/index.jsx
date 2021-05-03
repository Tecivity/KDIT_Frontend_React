//React
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserService } from '../../services';
import { SessionApi } from '../../hook/SessionApi';
//CSS
import './index.css';

const SubComBox = ({ subCom }) => {
	//History
	const history = useHistory();
	const [isFollow, setIsFollow] = useState(false)
	const [userData ,setUserData] = useState({})

	const { user } = useContext(SessionApi);


	//Functions
	const handleOnClick = () => {
		history.push(`/community/${subCom.id}`);
	};

	const followOnClick = async () => {
		const newFollowList = [...userData.mySubCom]
		if (isFollow) {
			newFollowList.pop(subCom.id)
		} else {
			newFollowList.push(subCom.id)
		}
		console.log(newFollowList)
		setIsFollow(!isFollow)
		// UserService.updateUser(userData.id, { mySubCom: newFollowList }).then(() => {
		// 	setIsFollow(!isFollow)
		// 	UserService.getUser(user.uid).then(data=>{
		// 		setUserData(data)
		// 	})
		// })
	}

	const fetchData = async () => {
		UserService.getUser(user.uid).then(data=>{
			setUserData(data)
		})
		if (subCom.id && userData) {
			try {
				if (userData.mySubCom.includes(subCom.id)) {
					setIsFollow(true)
				}
			} catch (err) {
				UserService.updateUser(userData.id, { mySubCom: [] })
			}
		}
	};

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<div id={subCom.id} className="subcomDiv">
				<div className="subComBackgroundPane" onClick={handleOnClick}>
					<img
						src={subCom.bannerURL}
						alt=""
						width="100%"
						height="130%"
						style={{
							margin: '0',
							objectFit: 'cover',
							borderRadius: '2rem 2rem 0 0',
							zIndex: '-1',
						}}
					/>
				</div>
				<div className="subComImagePane" onClick={handleOnClick}>
					<img src={subCom.photoURL} alt="" className="subComImg" />
				</div>
				<div className="subcomInfoPane" onClick={handleOnClick}>
					<h3 style={{ display: 'inline', margin: '0' }}>
						{subCom.name}
					</h3>
					<p
						style={{
							fontSize: '0.8rem',
							display: 'inline',
							color: 'grey',
							margin: '0',
						}}
					>
						{subCom.totalFollow} Members
					</p>
					<p
						style={{
							fontSize: '1rem',
							color: 'grey',
						}}
					>
						{subCom.description}
					</p>
				</div>
				<div className="followPane">
					{isFollow ? (
						<>
							<button className="btn" onClick={followOnClick}>Followed</button>
						</>
					) : (
						<>
							<button className="btn" onClick={followOnClick}>Follow</button>
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default SubComBox;
