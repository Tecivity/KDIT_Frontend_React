//React
import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useHistory } from 'react-router-dom';
//Components
import { Navbar, Card, SideNavbar } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
//CSS
import './HomePage.css';

export default function HomePage() {
	const { isNewUser } = React.useContext(SessionApi);
	const history = useHistory();

	//Effects
	React.useEffect(() => {
		authListener();
		if (isNewUser) {
			history.push(`/welcome`);
		}
	}, [isNewUser]);

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
