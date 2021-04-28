import './index.css';

import React from 'react';

const HelpBox = ({ id, question, answer }) => {
	return (
		<>
			<div id={id} className="helpBox">
				<h2 style={{ textAlign: 'center' }}>{question}</h2>
				<button className="seeMoreHelpBtn">See More</button>
			</div>
		</>
	);
};

export default HelpBox;
