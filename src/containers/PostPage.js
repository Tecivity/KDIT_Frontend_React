import React, { useContext } from 'react';
import { Navbar, Card, SideNavbar, FullPost } from '../components';

const PostPage = (props) => {
	//Props
	const post = props.location.state;

	return (
		<>
			<Navbar />
			<SideNavbar />
			<div className="postPane">
				<FullPost post={post} />
			</div>
		</>
	);
};

export default PostPage;
