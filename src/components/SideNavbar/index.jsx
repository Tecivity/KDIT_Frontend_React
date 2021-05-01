//React
import React from 'react';
//Components
import SearchBar from '../SearchBar';
//CSS
import './index.css';

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
