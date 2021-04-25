import React, { useState, useEffect } from 'react';
import './index.css';

const SubComBox = ({ subCom }) => {
	return (
		<>
			<div id={subCom.id} className="subcomDiv">
				<h3>{subCom.name}</h3>
				<h4>{subCom.description}</h4>
				<button className="btn">Notification</button>
				<button className="btn">Unfollow</button>
			</div>
		</>
	);
};

export default SubComBox;
