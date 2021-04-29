import React from 'react';
import { HelpBox, Navbar } from '../components';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const HelpPage = () => {
	//Data
	const questions = [
		{
			id: 1,
			question: 'Have Problem with Login?',
			answer: 'Try Login Again',
		},
		{
			id: 2,
			question: "Didn't know where to start?",
			answer: 'Let me be your guide',
		},
		{
			id: 3,
			question: 'How can i change my name?',
			answer: 'Go to profile setting',
		},
	];

	const FAQ = [
		{
			id: 4,
			question: 'Have Problem with Login?',
			answer: 'Try Login Again',
		},
		{
			id: 5,
			question: "Didn't know where to start?",
			answer: 'Let me be your guide',
		},
		{
			id: 6,
			question: 'How can i change my name?',
			answer: 'Go to profile setting',
		},
	];

	return (
		<>
			<Navbar />
			<div className="helpPane">
				<div class="topHelpBox">
					<h1 class="helpHead">Need Help?</h1>
					<div class="helpBoxPane">
						{questions.map((question) => {
							return (
								<HelpBox
									id={question.id}
									question={question.question}
									answer={question.answer}
								/>
							);
						})}

						{/* <h2>FAQ</h2> */}
						{FAQ.map((question) => {
							return (
								<HelpBox
									id={question.id}
									question={question.question}
									answer={question.answer}
								/>
							);
						})}
					</div>
				</div>
				<Popup trigger={<button>Trigger</button>} position="top left">
					{(close) => (
						<div>
							Content here
							<a className="close" onClick={close}>
								&times;
							</a>
						</div>
					)}
				</Popup>
			</div>
		</>
	);
};

export default HelpPage;
