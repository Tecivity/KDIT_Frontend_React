import React, { useState, useEffect } from 'react';
import firebase from 'firebase';
import StyleFirebaseUI from 'react-firebaseui/StyledFirebaseAuth';

var uiConfig = {
	signInFlow: 'popup',
	signInOptions: [
		// firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
	],
	callback: {
		signInSuccessWithAuthResult: async (authResult) => {
			const userInfo = authResult.additionalUserInfo;
			if (userInfo.isNewUser && userInfo.providerId === 'password') {
				try {
					await authResult.user.sendEmailVerification();
					console.log('Check Your Email.');
				} catch (error) {
					console.log('Enable to send Verification Email');
				}
			}
			return false;
		},
	},
};

const Signup = () => {
	//States
	const [user, setUser] = useState(null);

	//Effects
	useEffect(() => {
		const authObserver = firebase.auth().onAuthStateChanged((user) => {
			setUser(user);
		});

		return authObserver;
	});

	//Functions
	const signOut = () => {
		firebase
			.auth()
			.signOut()
			.then(function () {
				console.log('Successfully Signed Out.');
			})
			.catch(function () {
				console.log('Error Signed Out.');
			});
	};

	//Components
	if (user) {
		return (
			<>
				<h1>Welcome, {user.displayName}</h1>
				<br />
				<h3>{user.email}</h3>
				<button onClick={signOut}>Logout</button>
			</>
		);
	} else {
		return (
			<>
				<div>
					<StyleFirebaseUI
						uiConfig={uiConfig}
						firebaseAuth={firebase.auth()}
					/>
				</div>
			</>
		);
	}
};

export default Signup;
