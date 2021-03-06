//React
import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { bounceInLeft, fadeIn } from 'react-animations';
//Firbase
import firebase from '../../firebase';
//Components
import { Signup } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
//CSS
import './authPage.css';
//External
import Radium, { StyleRoot } from 'radium';

export default function AuthPage() {
	//Variables
	// var provider = new firebase.auth.GoogleAuthProvider();

	const styles = {
		bounceInLeft: {
			animation: '1s',
			animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
		},
		fadeIn: {
			animation: '3s',
			animationName: Radium.keyframes(fadeIn, 'fadeIn'),
		},
	};

	//States
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailError, setEmailError] = useState('');
	const [passwordError, setPasswordError] = useState('');

	//Effects
	useEffect(() => {
		authListener();
	}, []);

	//Contexts
	const { user, setUser, setSession } = useContext(SessionApi);

	//Functions
	const clearInputs = () => {
		setEmail('');
		setPassword('');
	};

	// const clearErrors = () => {
	// 	setEmailError('');
	// 	setPasswordError('');
	// };

	// const handleLogin = () => {
	// 	clearErrors();
	// 	console.log(email, password);
	// 	firebase
	// 		.auth()
	// 		.signInWithEmailAndPassword(email, password)
	// 		.then((result) => console.log(result))
	// 		.catch((err) => {
	// 			setEmailError(err.message);
	// 		});
	// };

	// const googleLogin = () => {
	// 	firebase
	// 		.auth()
	// 		.signInWithPopup(provider)
	// 		.then((result) => {
	// 			/** @type {firebase.auth.OAuthCredential} */
	// 			var credential = result.credential;

	// 			// This gives you a Google Access Token. You can use it to access the Google API.
	// 			var token = credential.accessToken;
	// 			// The signed-in user info.
	// 			var user = result.user;
	// 			// ...
	// 		})
	// 		.catch((error) => {
	// 			// Handle Errors here.
	// 			var errorCode = error.code;
	// 			var errorMessage = error.message;
	// 			// The email of the user's account used.
	// 			var email = error.email;
	// 			// The firebase.auth.AuthCredential type that was used.
	// 			var credential = error.credential;
	// 			// ...
	// 		});
	// };

	// const handleSingup = () => {
	// 	clearErrors();
	// 	console.log(email, password);
	// 	firebase
	// 		.auth()
	// 		.createUserWithEmailAndPassword(email, password)
	// 		.then((result) => console.log(result))
	// 		.catch((err) => {
	// 			setEmailError(err.message);
	// 		});
	// };

	// const handleLogout = () => {
	// 	firebase.auth().signOut();
	// };

	const authListener = () => {
		firebase.auth().onAuthStateChanged((user) => {
			// console.log(user);
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

	return (
		<div className="auth-Pane">
			<StyleRoot>
				<div className="auth-TextPane" style={styles.bounceInLeft}>
					<h1 className="nisitText">NISIT</h1>
					<h2 className="nisitSubText">
						We Connect{' '}
						<span style={{ color: '#f48c51' }}>Students</span>{' '}
					</h2>
					{user ? (
						<Redirect push to="/" />
					) : (
						<div className="auth-login">
							<Signup />
						</div>
					)}
				</div>
				<div className="auth-Background" style={styles.fadeIn}></div>
			</StyleRoot>
		</div>
	);
}
