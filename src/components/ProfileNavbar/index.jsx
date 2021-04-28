import './index.css';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ProfileNavbar = ({ menu }) => {
	return (
		<>
			<div>
				<Link to={menu.to}>{menu.text}</Link>
			</div>
		</>
	);
};

export default ProfileNavbar;
