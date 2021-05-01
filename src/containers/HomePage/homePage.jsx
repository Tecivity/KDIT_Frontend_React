//React
import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
//Components
import { Navbar, Card, SideNavbar } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
//CSS
import './HomePage.css';

export default function HomePage() {
	//Effects
	React.useEffect(() => {
		authListener();
	}, []);

	//Contexts
	const { authListener, loading } = React.useContext(SessionApi);

	//Render
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
