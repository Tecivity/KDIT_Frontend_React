import React from 'react';
import { HelpBox, Navbar } from '../components';

const HelpPage = () => {
	//Data
	const questions = [
		{
			question: 'Have Problem with Login?',
			answer: 'Try Login Again',
		},
		{
			question: "Didn't know where to start?",
			answer: 'Let me be your guide',
		},
		{
			question: 'How can i change my name?',
			answer: 'Go to profile setting',
		},
	];

	const FAQ = [
		{
			question: 'Have Problem with Login?',
			answer: 'Try Login Again',
		},
		{
			question: "Didn't know where to start?",
			answer: 'Let me be your guide',
		},
		{
			question: 'How can i change my name?',
			answer: 'Go to profile setting',
		},
	];

	return (
		<>
			<Navbar />
			<div>
				<h1>Need Help?</h1>
			</div>
			<div>
				<h2>How can we help?</h2>
				{questions.map((question) => {
					return (
						<HelpBox
							question={question.question}
							answer={question.answer}
						/>
					);
				})}
				<hr />
				<hr />
				<h2>FAQ</h2>
				{FAQ.map((question) => {
					return (
						<HelpBox
							question={question.question}
							answer={question.answer}
						/>
					);
				})}
			</div>
		</>
	);
};

export default HelpPage;
