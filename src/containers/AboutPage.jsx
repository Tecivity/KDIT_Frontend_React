import React from 'react';
import { Navbar } from '../components';

const AboutPage = () => {
	return (
		<>
			<Navbar />
			<div className="about">
				<h1 class="head">Connect </h1>
				<h1 class="orangeHead">NISIT</h1>
				<h1 class="Head"> together</h1>
				<h3>
					Keddit is a home to many communities in KMITL, endless
					conversation and authenic human connection.
				</h3>
			</div>
		</>
	);
};

export default AboutPage;