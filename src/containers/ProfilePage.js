import React from 'react';
import { Navbar, ProfileNavbar } from '../components';

const ProfilePage = () => {
	//Data
	const menus = [
		{
			to: '/profile',
			text: 'Profile',
		},
		{
			to: '/account',
			text: 'Account',
		},
		{
			to: '/safetyandprivacy',
			text: 'Safety & Privacy',
		},
		{
			to: '/subscription',
			text: 'Subscription',
		},
		{
			to: '/feedsetting',
			text: 'Feed Setting',
		},
	];

	return (
		<>
			<Navbar />
			<hr />
			<div>
				{menus.map((menu) => {
					return <ProfileNavbar menu={menu} />;
				})}
			</div>
		</>
	);
};

export default ProfilePage;
