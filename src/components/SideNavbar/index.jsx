//React
import React, { useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
//Components
import SearchBar from '../SearchBar';
//Firebase
import firebase from '../../firebase';

//External

//CSS
import './index.css';
import 'react-slideshow-image/dist/styles.css';

const SideNavbar = () => {
	//Varables
	const ref = firebase.firestore().collection('posts');

	//States
	const [posts, setPosts] = useState([]);

	//Functions
	const fetchData = async () => {
		const postsArray = [];
		ref.onSnapshot((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				postsArray.push({ id: doc.id, ...doc.data() });
			});
			setPosts(postsArray);
		});
	};

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Functions
	const genTrendPost = () => {
		for (var i = 0; i < 3; i++) {
			return (
				<div className="each-slide">
					<div>
						<h4>User Images</h4>
						<h5>Username</h5>
						<p>Post Content</p>
					</div>
				</div>
			);
		}
	};

	const genCommunity = () => {
		for (var i = 0; i < 3; i++) {
			return (
				<div className="each-slide">
					<div>
						<h4>Community Image</h4>
						<h5>Community Name</h5>
						<p>Community Description</p>
					</div>
				</div>
			);
		}
	};

	return (
		<>
			<div className="side-navbar">
				<SearchBar />
				<div className="trends">
					<div>
						<h3 style={{ marginBottom: '0' }}>Posts</h3>
						<Slide easing="ease" style={{ margin: 'auto' }}>
							{genTrendPost()}
						</Slide>
					</div>
					<div>
						<h3 style={{ marginBottom: '0' }}>Community</h3>
						<Slide easing="ease" style={{ margin: 'auto' }}>
							{genCommunity()}
						</Slide>
					</div>
				</div>
			</div>
		</>
	);
};

export default SideNavbar;
