import React from 'react';
import { Navbar, Card, SideNavbar } from '../components';
import { SessionApi } from '../hook/SessionApi';
import { Link } from 'react-router-dom';

export default function HomePage() {
	const { handleLogout } = React.useContext(SessionApi);
	return (
		<div>
			<Navbar />
			<Card />
			<SideNavbar />
			<Link to="/auth" onClick={() => handleLogout()}>
				<button className="create-button">Logout</button>
			</Link>
		</div>
	);
}
