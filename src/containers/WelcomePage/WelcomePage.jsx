//React
import React, { useState, useContext } from 'react';
import Select from 'react-select';
import { bounceInLeft, fadeIn, fadeInUp } from 'react-animations';
import { SessionApi } from '../../hook/SessionApi';
import { useHistory } from 'react-router-dom';
//External
import Radium, { StyleRoot } from 'radium';
//CSS
import './WelcomePage.css';
import { SubComService, UserService } from '../../services';

//Data
const options = [
	{
		value: 'iaEaSz2t6gC1p4m6uiYG',
		label: '1.วิศวกรรมศาสตร์',
	},
	{
		value: 'Gywz5sS1QpcbI12S8qi8',
		label: '2.สถาปัตยกรรมศาสตร์',
	},
	{
		value: 'N5QbHem9ucxJeo7tCAVI',
		label: '3.ครุศาสตร์อุตสาหกรรมและเทคโนโลยี',
	},
	{
		value: 'eqLxGobNfoXjsV57D4SD',
		label: '4.เทคโนโลยีการเกษตร',
	},
	{
		value: 'wj2cVCsQ48WTiYrfiXHG',
		label: '5.วิทยาศาสตร์',
	},
	{
		value: '23I8og973kPCvxkQn0jx',
		label: '6.อุตสาหกรรมอาหาร',
	},
	{
		value: 'nEsgmpSSuQtj42RY4wLI',
		label: '7.เทคโนโลยีสารสนเทศ',
	},
	{
		value: '0S8lqLP55NGppGj0BHUw',
		label: '8.วิทยาลัยนาโนเทคโนโลยีพระจอมเกล้าลาดกระบัง',
	},
	{
		value: '4jrIT4hOsTj5TMZqpjQ5',
		label: '9.วิทยาลัยนวัตกรรมการผลิตขั้นสูง',
	},
	{
		value: 'MGyXbjCCJtMAvXGfXB5N',
		label: '10.บริหารธุรกิจ',
	},
	{
		value: '63IBiIc1QisXxYT3lgNR',
		label: '11.วิทยาลัยอุตสาหกรรมการบินนานาชาติ',
	},
	{
		value: 'zZbeKuRaeWdsM829Twai',
		label: '12.ศิลปศาสตร์',
	},
	{
		value: '4YdLi6VD8KHqsOjtOlmN',
		label: '13.แพทยศาสตร์',
	},
	{
		value: '9lBdHoL9sKoF7vpaZDGB',
		label: '14.วิทยาลัยวิศวกรรมสังคีต',
	},
	{
		value: 'ZHg8sN4DTSgLOskPdc7o',
		label: '15.วิทยาเขตชุมพรเขตรอุดมศักดิ์',
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
	// const [showSuggest, setShowSuggest] = useState(false);
	const [displayName, setDisplayName] = useState('');
	const [selectedData, setSelectedData] = useState();
	const [selected, setSelected] = useState(false);
	const [nameLen, setNameLen] = useState(0);

	const { userInfo, setIsNewUser } = useContext(SessionApi);
	const history = useHistory();

	const handleChange = (e) => {
		setSelectedData(e);
		// setShowSuggest(false)
		console.log(selectedData);
		setSelected(true);
	};

	const checkNameLen = (e) => {
		const max_len = 20;
		setNameLen(e.target.value.length);
		if (e.target.value.length < max_len) {
			setDisplayName(e.target.value);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		const subData = {
			displayName,
			isNewUser: false,
			mySubCom: [
				{
					value: selectedData.value,
					label: selectedData.label.split('.')[1],
				},
			],
		};
		SubComService.getSubCom(selectedData.value).then((data) => {
			const newTotalFollow = data.totalFollow;
			newTotalFollow.push(userInfo.id);
			SubComService.updateSubCom(selectedData.value, {
				totalFollow: newTotalFollow,
			}).then(() => {
				console.log('update totalFollow success');
			});
		});
		UserService.updateUser(userInfo.id, subData).then(() => {
			console.log(subData);
			setIsNewUser(false);
			history.push(`/`);
		});
	};

	//Render
	return (
		<StyleRoot>
			<div className="welcomePane">
				<form
					action=""
					className="welcomeForm"
					style={styles.bounceInLeft}
				>
					<h3 style={{ textAlign: 'center' }}>
						What Should We Call You?
					</h3>

					<input
						type="text"
						value={displayName}
						onChange={(e) => checkNameLen(e)}
						placeholder="Your name..."
						className="welcome-input"
						required
					/>

					<p
						style={{
							color: 'grey',
							fontSize: '1rem',
							marginTop: '0.5rem',
							marginLeft: 'auto',
						}}
					>
						{nameLen}/20
					</p>
					<h3 style={{ textAlign: 'center' }}>คณะที่เรียน</h3>
					<Select
						options={options}
						value={selectedData}
						onChange={handleChange}
					/>
					{selected && (
						<button
							type="submit"
							onClick={handleSubmit}
							className="btn"
							style={{ width: '50%', marginTop: '3rem' }}
						>
							Next
						</button>
					)}
				</form>

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
