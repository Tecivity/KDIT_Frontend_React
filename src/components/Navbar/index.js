import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
	//States
	const [searchText, setSearchText] = useState('');

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
				</header>
			</div>
		</div>
	);
}
