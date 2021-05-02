//React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
//CSS
import './index.css';

const SubComBox = ({ subCom }) => {
	//History
	const history = useHistory();

	//Functions
	const handleOnClick = () => {
		history.push(`/community/${subCom.id}`);
	};

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
					<button className="btn">Follow</button>
				</div>
			</div>
		</>
	);
};

export default SubComBox;
