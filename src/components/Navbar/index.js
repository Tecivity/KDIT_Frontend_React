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
						<Link to="/">Home</Link>
						<input
							type="text"
							onChange={(e) => setSearchText(e.target.value)}
							placeholder="search something..."
						/>
						<button>Search</button>

						<ul>
							<li>
								<Link to="/sub-community">Sub Community</Link>
							</li>
							<li>
								<Link to="/help">Help</Link>
							</li>
							<li>
								<Link to="/about">About Us</Link>
							</li>
							<li>
								<Link to="/profile">Profile</Link>
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
