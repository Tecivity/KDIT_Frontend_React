import './index.css';

import React from 'react';

const HelpBox = ({ id, question, answer }) => {
	return (
		<>
			<div id={id}>
				<hr />
				<h2>{question}</h2>
				<h2>{answer}</h2>
				<hr />
			</div>
		</>
	);
};

export default HelpBox;
