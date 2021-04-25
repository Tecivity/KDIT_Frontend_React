import './style.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SessionApi } from '../../hook/SessionApi';

export default function Navbar() {
	//States
	const [searchText, setSearchText] = useState('');

	//Context
	const { session, handleLogout } = React.useContext(SessionApi);

	//Functions
	const handleSearch = () => {
		console.log();
	};

	return (
		<div className="navbar">
			<div className="content">
				<header>
					<div className="menu">
						<div className="testLogo"></div>
						<Link to="/" className="siteName">
							Home
						</Link>

						<Link to="/sub-community" className="subcomText">
							Sub-Com
						</Link>

						<Link to="/help" className="helpText">
							Help
						</Link>

						<Link to="/about" className="aboutText">
							About Us
						</Link>

						<Link to="/profile" className="profileText">
							Profile
						</Link>
					</div>
					{session ? (
						<Link to="/auth" onClick={() => handleLogout()}>
							<button className="create-button">Logout</button>
						</Link>
					) : (
						<Link to="/auth">
							<button className="create-button">Login</button>
						</Link>
					)}
				</header>
			</div>
			{session ? (
				<Link to="/auth" onClick={() => handleLogout()}>
					<button className="create-button">Logout</button>
				</Link>
			) : (
				<Link to="/auth">
					<button className="create-button">Login</button>
				</Link>
			)}
		</div>
	);
}
