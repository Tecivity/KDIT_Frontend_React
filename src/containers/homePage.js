import React from 'react';
import { Navbar, Card } from '../components';
import { SessionApi } from '../hook/SessionApi';
import { Link } from 'react-router-dom';

export default function HomePage() {
	const { handleLogout } = React.useContext(SessionApi);
	return (
		<div>
			<Navbar />
			<Card />
			<h1>This is home page.</h1>
			<Link to="/auth" onClick={() => handleLogout()}>
				<button className="create-button">Logout</button>
			</Link>
		</div>
	);
}
