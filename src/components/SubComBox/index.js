import React, { useState, useEffect } from 'react';

const SubComBox = ({ subCom }) => {
	return (
		<>
			<div>
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
