import React from 'react';
import { HelpBox, Navbar } from '../components';

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
			<div>
				<h1>Need Help?</h1>
			</div>
			<div>
				<h2>How can we help?</h2>
				{questions.map((question) => {
					return (
						<HelpBox
							id={question.id}
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
							id={question.id}
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
