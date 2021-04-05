import './index.css';

import React from 'react';

const HelpBox = ({ question, answer }) => {
	return (
		<>
			<div>
				<hr />
				<h2>{question}</h2>
				<h2>{answer}</h2>
				<hr />
			</div>
		</>
	);
};

export default HelpBox;
