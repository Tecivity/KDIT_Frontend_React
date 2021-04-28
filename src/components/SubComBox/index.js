import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
			<div id={subCom.id} className="subcomDiv" onClick={handleOnClick}>
				<div className="subComImagePane">
					<img src={subCom.photoURL} alt="" className="subComImg" />
				</div>
				<div className="subcomInfoPane">
					<h3 style={{ display: 'inline' }}>{subCom.name} ○ </h3>
					<p
						style={{
							fontSize: '10',
							display: 'inline',
							color: 'grey',
						}}
					>
						{subCom.totalFollow} Members
					</p>
					<h4>{subCom.description}</h4>
				</div>
				<div className="followPane">
					<button className="btn">Follow</button>
				</div>
			</div>
		</>
	);
};

export default SubComBox;
