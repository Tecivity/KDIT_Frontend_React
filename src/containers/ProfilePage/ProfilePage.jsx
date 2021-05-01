//React
import React from 'react';
import { useParams } from 'react-router-dom';
//Components
import { Navbar, Profile, SideNavbar } from '../../components';
import { SessionApi } from '../../hook/SessionApi'

const ProfilePage = () => {
	const { id } = useParams();
	const { user } = React.useContext(SessionApi)

	React.useEffect(()=>{
		console.log(id)
	},[])
	//Render
	return (
		<>
			<Navbar />
			<Profile id={id ? id : user.uid}/>
			<SideNavbar />
		</>
	);
};

export default ProfilePage;
