import React, { useState, useEffect } from 'react';

const SubComBox = ({ subCom }) => {
	return (
		<>
			<div id={subCom.id} className="subcomDiv">
				<hr />
				<h1>{subCom.name}</h1>
				<h2>{subCom.description}</h2>
				<button>Notification</button>
				<button>Unfollow</button>
				<hr />
			</div>
		</>
	);
};

export default SubComBox;
