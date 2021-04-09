import './index.css';
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
					<div>
						<div className="testLogo"></div>
						<Link to="/" className="siteName">K | Keddit</Link>
						<input
							type="text"
							className="searchBar"
							onChange={(e) => setSearchText(e.target.value)}
							placeholder=" Try, รีวิววิชาเลือก"
						/>
						<button className="searchIcon">Search</button>

						<ul>
							<li>
								<Link to="/sub-community" className="subcomText">Sub-Com</Link>
							</li>
							<li>
								<Link to="/help" className="helpText">Help</Link>
							</li>
							<li>
								<Link to="/about" className="aboutText">About Us</Link>
							</li>
							<li>
								<Link to="/profile" className="profileText">Profile</Link>
							</li>
						</ul>
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
		</div>
	);
}
