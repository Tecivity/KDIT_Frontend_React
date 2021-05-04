//React
import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { UserService } from '../../services';
import { SessionApi } from '../../hook/SessionApi';
import { FaCheckCircle } from 'react-icons/fa';
//CSS
import './index.css';

const SubComBox = ({ subCom }) => {
	//History
	const history = useHistory();
	const [isFollow, setIsFollow] = useState(false);
	const [isApprove, setIsApprove] = useState(false);

	const { userInfo, defaultBanner } = useContext(SessionApi);

	//Functions
	const handleOnClick = () => {
		history.push(`/community/${subCom.id}`);
	};

	// const followOnClick = async () => {
	// 	console.log(subCom);
	// };

	const fetchData = async () => {
		if (subCom.id) {
			try {
				if (userInfo.mySubCom.includes(subCom.id)) {
					setIsFollow(true);
				}
				setIsApprove(subCom.isApprove);
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
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<h3
							style={{
								margin: '0 0',
							}}
						>
							{subCom.name}
							{isApprove ? (
								<FaCheckCircle
									size="20px"
									style={{ marginLeft: '0.5rem' }}
								/>
							) : (
								<span></span>
							)}
						</h3>
					</div>
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
