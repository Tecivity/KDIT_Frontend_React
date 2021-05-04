//React
import React, { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';
import { useHistory, useParams } from 'react-router-dom';
//Components
import { Navbar, Card, SideNavbar, FullPost } from '../../components';
import { SessionApi } from '../../hook/SessionApi';
//Firebase
import firebase from '../../firebase';
import { PostModel } from '../../firebase/models';
import { PostService } from '../../services';

const PostPage = () => {
	//Params
	const { id } = useParams();

	//States
	const [post, setPost] = useState({});

	//Effects
	useEffect(() => {
		authListener();
		fetchData();
	}, []);

	//Contexts
	const { authListener, loading } = React.useContext(SessionApi);

	const fetchData = async () => {
		PostService.getPost(id).then(data=>{
			setPost(data)
		})
	};

	return (
		<>
			{loading ? (
				<div className="auth-loading">
					<HashLoader
						className="auth-loading"
						color={'#272727'}
						loading={loading}
						size={100}
					/>
				</div>
			) : (
				<div>
					<Navbar />
					<SideNavbar />
					<div className>
						<FullPost
							post={post}
							id={id}
						/>
					</div>
				</div>
			)}
		</>
	);
};

export default PostPage;
