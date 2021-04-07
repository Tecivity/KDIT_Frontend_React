import React from 'react';
import { Navbar, Card, SideNavbar } from '../components';
import { SessionApi } from '../hook/SessionApi';
import { Link } from 'react-router-dom';

export default function HomePage() {
	return (
		<div>
			<Navbar />
			<Card />
			<SideNavbar />
		</div>
	);
}
