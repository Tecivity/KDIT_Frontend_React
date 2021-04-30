import React, { useState } from 'react';
import './index.css';
import Select from 'react-select';
import Radium, { StyleRoot } from 'radium';
import { bounceInLeft, fadeIn, slideInUp } from 'react-animations';

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
	slideInUp: {
		animation: '1s',
		animationName: Radium.keyframes(slideInUp, 'slideInUp'),
	},
	fadeIn: {
		animation: '3s',
		animationName: Radium.keyframes(fadeIn, 'fadeIn'),
	},
};

const WelcomePage = () => {
	const [showSuggest, setShowSuggest] = useState(false);

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
						animationName: Radium.keyframes(slideInUp, 'slideInUp'),
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
