//React
import React, { useState } from 'react';
import Select from 'react-select';
import { bounceInLeft, fadeIn, fadeInUp } from 'react-animations';
//External
import Radium, { StyleRoot } from 'radium';
//CSS
import './WelcomePage.css';

//Data
const options = [
	{
		value: 'chocolate',
		label: 'Chocolate',
	},
	{
		value: 'strawberry',
		label: 'Strawberry',
	},
	{
		value: 'vanilla',
		label: 'Vanilla',
	},
];

//Animations
const styles = {
	bounceInLeft: {
		animation: '1s',
		animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
	},
	fadeInUp: {
		animation: '1s',
		animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
	},
	fadeIn: {
		animation: '3s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn'),
	},
};

const WelcomePage = () => {
	//States
	const [showSuggest, setShowSuggest] = useState(false);

	//Render
	return (
		<StyleRoot>
			<div className="welcomePane">
				<div
					action=""
					className="welcomeForm"
					style={styles.bounceInLeft}
				>
					<h3 style={{ textAlign: 'center' }}>
						What Should We Call You?
					</h3>
					<input type="text" />
					<h3 style={{ textAlign: 'center' }}>คณะที่เรียน</h3>
					<Select
						options={options}
						onChange={() => setShowSuggest(false)}
					/>
					{!showSuggest && (
						<button
							onClick={() => setShowSuggest(true)}
							className="btn"
							style={{ width: '50%', marginTop: '3rem' }}
						>
							Next
						</button>
					)}
					{showSuggest && (
						<div>
							<h1>This Suggest Community HERE</h1>
						</div>
					)}
				</div>

				<h1
					className="nisitText"
					style={{
						fontSize: '8em',
						marginTop: '0',
						animation: '1s',
						animationName: Radium.keyframes(fadeInUp, 'fadeInUp'),
					}}
				>
					NISIT
				</h1>

				<div
					className="welcomePageBackground"
					style={styles.fadeIn}
				></div>
			</div>
		</StyleRoot>
	);
};

export default WelcomePage;
