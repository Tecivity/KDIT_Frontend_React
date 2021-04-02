import React, { useState, useEffect, useContext } from 'react';
import './index.css';
import firebase from '../firebase';
import Login from '../components/Authen';
import Navbar from '../components/Navbar';
import { Redirect } from 'react-router-dom';
import { SessionApi } from '../hook/SessionApi';

export default function AuthPage() {
	const { user, setUser, setSession } = useContext(SessionApi);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');
	const [hasAccount, setHasAccount] = useState(false);

	const clearInputs = () => {
		setEmail('');
		setPassword('');
	};

	const clearErrors = () => {
		setEmailError('');
		setPasswordError('');
	};

	const handleLogin = () => {
		clearErrors();
		console.log(email, password);
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then((result) => console.log(result))
			.catch((err) => {
				setEmailError(err.message);
			});
	};

	const handleSingup = () => {
		clearErrors();
		console.log(email, password);
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then((result) => console.log(result))
			.catch((err) => {
				setEmailError(err.message);
			});
	};

	const handleLogout = () => {
		firebase.auth().signOut();
	};

	const authListener = () => {
		firebase.auth().onAuthStateChanged((user) => {
			console.log(user);
			if (user) {
				clearInputs();
				setUser(user);
				setSession(true);
			} else {
				setUser('');
				setSession(false);
			}
		});
	};

	useEffect(() => {
		authListener();
	}, []);

	return (
		<div>
			<Navbar user={user} handleLogout={handleLogout} />
			{user ? (
				<Redirect push to="/" />
			) : (
				<div className="loginView">
					<Login
						email={email}
						setEmail={setEmail}
						password={password}
						setPassword={setPassword}
						handleLogin={handleLogin}
						handleSingup={handleSingup}
						hasAccount={hasAccount}
						setHasAccount={setHasAccount}
						emailError={emailError}
						passwordError={passwordError}
					/>
				</div>
			)}
			{/* <div className="loginView">
                <Login
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    handleLogin={handleLogin}
                    handleSingup={handleSingup}
                    hasAccount={hasAccount}
                    setHasAccount={setHasAccount}
                    emailError={emailError}
                    passwordError={passwordError}
                />
            </div> */}
		</div>
	);
}
