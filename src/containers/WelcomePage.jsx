import React, { Component } from 'react';
import Select from 'react-select';

const options = [
	{
		value: 'chocolate',
		label: 'Chocolate',
		option: { value: 'black-chocolate', label: 'Black Chocolate' },
	},
	{
		value: 'strawberry',
		label: 'Strawberry',
		option: { value: 'blue-berry', label: 'Blue Berry' },
	},
	{
		value: 'vanilla',
		label: 'Vanilla',
		option: { value: 'black-vanilla', label: 'Black Vanilla' },
	},
];

const WelcomePage = () => {
	return (
		<div>
			<h1>Welcome</h1>
			<form action="">
				<label htmlFor="">What should people call we?</label>
				<input type="text" />
				<label htmlFor="">คณะที่เรียน</label>
				<Select options={options} />
				<Select options={options.option} />
			</form>
		</div>
	);
};

export default WelcomePage;
