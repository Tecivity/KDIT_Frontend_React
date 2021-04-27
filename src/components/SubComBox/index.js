import React, { useState, useEffect } from 'react';
import './index.css';

const SubComBox = ({ subCom }) => {
	return (
		<>
			<div id={subCom.id} className="subcomDiv">
				<div className="subComImagePane">
					<img
						src="https://cdn.jeab.com/wp-content/uploads/2020/03/wallpaper-for-jeab06.jpg"
						alt=""
						className="subComImg"
					/>
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
						1K Members
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
