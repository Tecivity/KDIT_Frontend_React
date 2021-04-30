import React from 'react';
import { Navbar, Card, SideNavbar, CardProfile } from '../components';
import { SessionApi } from '../hook/SessionApi';
import { Link } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';
import './index.css';

export default function HomePage() {
	const { authListener, loading } = React.useContext(SessionApi);

	React.useEffect(() => {
		authListener();
	}, []);

	return (
		<div className="homepage">
			{loading ? (
				<div className="auth-loading">
					<HashLoader
						className="auth-loading"
						color={'#272727'}
						loading={loading}
						size={100}
					/>
				</div>
			) : (
				<div>
					<Navbar />
					<Card />
					<SideNavbar />
				</div>
			)}
		</div>
	);
}
