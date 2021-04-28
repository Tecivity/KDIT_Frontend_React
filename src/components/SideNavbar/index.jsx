import './index.css';

import React from 'react';
import SearchBar from '../SearchBar';

const SideNavbar = () => {
	return (
		<>
			<div className="side-navbar">
				<SearchBar />
				<div className="trends">
					<h3>This is Trends</h3>
				</div>
			</div>
		</>
	);
};

export default SideNavbar;
