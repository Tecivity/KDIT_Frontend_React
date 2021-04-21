import React from 'react';
import { Navbar, Card, SideNavbar } from '../components';
import { SessionApi } from '../hook/SessionApi';
import { Link } from 'react-router-dom';
import './index.css';

export default function HomePage() {
	return (
		<div className="homepage">
			<Navbar />
			<Card />
			<SideNavbar />
		</div>
	);
}
