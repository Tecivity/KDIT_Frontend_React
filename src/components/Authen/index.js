import React from 'react';
import { Signup } from '../../components';
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
					<h2>{hasAccount ? 'Sign Up' : 'Login'}</h2>
					<div className="form-group">
						<label>Username</label>
						<input
							type="email"
							autoFocus
							required
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<p className="errorMsg">{emailError}</p>
					</div>
					<div className="form-group">
						<label>Password</label>
						<input
							type="password"
							autoFocus
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<p className="errorMsg">{passwordError}</p>
					</div>
					<div>
						{!hasAccount ? (
							<>
								<input type="submit" value="Sign in" />
								<p>
									Don't have an account ?
									<span
										className="span"
										onClick={() =>
											setHasAccount(!hasAccount)
										}
									>
										{' '}
										Sign up
									</span>
								</p>
							</>
						) : (
							<>
								<input type="submit" value="Sign up" />
								<p>
									Have an account ?
									<span
										className="span"
										onClick={() =>
											setHasAccount(!hasAccount)
										}
									>
										{' '}
										Sign in
									</span>
								</p>
							</>
						)}
					</div>
					{/* Sign in with Google */}
					<Signup />
				</div>
			</form>
		</>
	);
}
