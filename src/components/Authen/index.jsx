//React
import React from 'react';
//Compontnts
import { Signup } from '..';

const Login = ({
	email,
	setEmail,
	password,
	setPassword,
	handleLogin,
	handleSingup,
	hasAccount,
	setHasAccount,
	emailError,
	passwordError,
}) => {
	//Functions
	const submitHandler = (e) => {
		e.preventDefault();
		!hasAccount ? handleLogin() : handleSingup();
	};

	//Render
	return (
		<>
			<form onSubmit={submitHandler}>
				<div>
					<Signup />
				</div>
			</form>
		</>
	);
};

export default Login;
