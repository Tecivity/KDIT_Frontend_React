import React, { createContext, useState } from 'react';
import firebase from '../firebase';
// import { User } from '../firebase/models'
import { UserService } from '../services';

export const SessionApi = createContext();
export const SessionProvider = ({ children }) => {
	const [user, setUser] = useState('');
	const [userInfo, setUserInfo] = useState('');
	const [session, setSession] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isAdmin, setIsAdmin] = useState(false);
	const [isNewUser, setIsNewUser] = useState(false);
	const defaultImage =
		'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
	const defaultBanner =
		'https://images7.alphacoders.com/110/thumbbig-1104854.jpg';

	const authListener = () => {
		setLoading(true);
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// console.log(user)
				setUser(user);
				setSession(true);
				UserService.getUser(user.uid)
					.then((data) => {
						setUserInfo(data);
						if (data.role === 'admin' || data.role === 'owner') {
							setIsAdmin(true);
						}
						const isNewUser = data.isNewUser;
						if (!isNewUser) {
							throw 'not found inNewUser';
						}
						setIsNewUser(true);
						setLoading(false);
					})
					.catch((err) => {
						UserService.updateUser(user.uid, {
							isNewUser: false,
						}).then(() => {
							console.log(err);
							setLoading(false);
						});
					});
			} else {
				setUser('');
				setUserInfo('');
				setSession(false);
				setLoading(false);
			}
		});
	};

	const handleLogout = () => {
		setLoading(true);
		firebase.auth().signOut();
		setLoading(false);
		setUser('');
		setSession(false);
	};

	return (
		<SessionApi.Provider
			value={{
				session,
				setSession,
				user,
				setUser,
				handleLogout,
				authListener,
				loading,
				setLoading,
				defaultImage,
				defaultBanner,
				userInfo,
				isAdmin,
				isNewUser,
				setIsNewUser,
			}}
		>
			{children}
		</SessionApi.Provider>
	);
};
