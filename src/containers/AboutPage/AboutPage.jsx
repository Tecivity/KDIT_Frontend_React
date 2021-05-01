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
				<h1 class="about-heading">Connect </h1>
				<h1 class="about-orangeHead">NISIT</h1>
				<h1 style={{ display: 'inline' }}> Together</h1>
				<h3>
				"Nisit is home to many communities in KMITL, aims to provide endless conversation and authentic human connection."
				</h3>
				<h4>
				For more information please contact our representative via nisit_official@kmitl.ac.th. If you are reporting a content policy violation, please provide us with extensive information including in your report form. If you need to contact us on Nisit.com, please reach out via nisit_moderator@kmitl.ac.th. For advertising support please also go at nisit_official@kmitl.ac.th.
				</h4>
			</div>
		</>
	);
};

export default AboutPage;
