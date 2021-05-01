//React
import React from 'react';
//Components
import { Navbar } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
//CSS
import './AboutPage.css';

const AboutPage = () => {
	//Contexts
	const { authListener, loading } = React.useContext(SessionApi);

	//Effects
	React.useEffect(() => {
		authListener();
	}, []);

	//Render
	return (
		<>
			<Navbar />
			<div className="about-Pane">
				<h1 class="about-heading">CONNECT </h1>
				<h1 class="about-orangeHead">NISIT</h1>
				<h1 style={{ display: 'inline' }}> TOGETHER</h1>
				<h3>
					Keddit is a home to many communities in KMITL, endless
					conversation and authenic human connection.
				</h3>
			</div>
		</>
	);
};

export default AboutPage;
