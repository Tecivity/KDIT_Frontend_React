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
	const [isFollow, setIsFollow] = useState(false);
	const [isApprove, setIsApprove] = useState(false)

	const { userInfo, authListener, defaultBanner } = useContext(SessionApi);

	//Functions
	const handleOnClick = () => {
		history.push(`/community/${subCom.id}`);
	};

	const followOnClick = async () => {
		console.log(subCom);
		// const newFollowList = [...userInfo.mySubCom]
		// if (isFollow) {
		// 	newFollowList.pop(subCom.id)
		// } else {
		// 	newFollowList.push(subCom.id)
		// }
		// console.log(newFollowList)
		// // setIsFollow(!isFollow)
		// UserService.updateUser(userInfo.id, { mySubCom: newFollowList }).then(() => {
		// 	setIsFollow(!isFollow)
		// 	authListener()
		// })
	};

	const fetchData = async () => {
		if (subCom.id) {
			try {
				if (userInfo.mySubCom.includes(subCom.id)) {
					setIsFollow(true);
				}
				setIsApprove(subCom.isApprove)
			} catch (err) {
				UserService.updateUser(userInfo.id, { mySubCom: [] });
			}
		}
	};

	//Effects
	useEffect(() => {
		fetchData();
	}, [subCom, isFollow]);

	return (
		<>
			<div id={subCom.id} className="subcomDiv" onClick={handleOnClick}>
				<div className="subComBackgroundPane" onClick={handleOnClick}>
					<img
						src={subCom.bannerURL || defaultBanner}
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
					<img
						src={
							subCom.photoURL ||
							'https://cdn.jeab.com/wp-content/uploads/2020/03/wallpaper-for-jeab06.jpg'
						}
						alt=""
						className="subComImg"
					/>
				</div>
				<div className="subcomInfoPane" onClick={handleOnClick}>
					<h3 style={{ display: 'inline', margin: '0' }}>
						{subCom.name}{isApprove ? <span>✔</span> : <span></span>}
					</h3>
					<p
						style={{
							fontSize: '0.8rem',
							display: 'inline',
							color: 'grey',
							margin: '0',
						}}
					>
						{subCom.totalFollow.length || 0} Members
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
			</div>
		</>
	);
};

export default SubComBox;
