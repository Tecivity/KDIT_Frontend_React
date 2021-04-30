import React from 'react';
import { Signup } from '..';
// import './styles.css';

export default function Login({
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
}) {
	const submitHandler = (e) => {
		e.preventDefault();
		!hasAccount ? handleLogin() : handleSingup();
	};

	return (
		<>
			<form onSubmit={submitHandler} class="auth">
				<div className="form-inner">
					<Signup />
				</div>
			</form>
		</>
	);
}
