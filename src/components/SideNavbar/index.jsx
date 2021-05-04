//React
import React, { useState, useEffect, useContext } from 'react';
import { Slide } from 'react-slideshow-image';
import {
	InstantSearch,
	connectHighlight,
	ClearRefinements,
	RefinementList,
	Configure,
	connectSearchBox,
	connectHits,
	connectPagination,
	HitsPerPage,
	SortBy,
} from 'react-instantsearch-dom';
//Components
import SearchBar from '../SearchBar';
import { SessionApi } from '../../hook/SessionApi';
import Post from '../PostCard/Post';
import parse from 'html-react-parser';

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
	const [post, setPost] = useState();
	const [test, setTtest] = useState('TEST');

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Context
	const { user, loading, setLoading, userInfo, authListener } = useContext(
		SessionApi,
	);

	//Functions

	const fetchData = async () => {
		setLoading(true);
		const postsArray = [];
		const subCom = [];
		// console.log('userInfo : ', userInfo)
		// console.log(Array.isArray(userInfo.mySubCom), userInfo.mySubCom);
		if (Array.isArray(userInfo.mySubCom)) {
			userInfo.mySubCom.forEach((data) => {
				subCom.push(data.value);
				// console.log(typeof data.value)
			});
			// console.log('subCom : ', subCom, Array.isArray(subCom));
			ref.orderBy('timeStamp', 'desc')
				// .where('subComUID', 'in', [...subCom])
				.limit(3)
				.onSnapshot(
					(querySnapshot) => {
						querySnapshot.forEach((doc) => {
							postsArray.push({ id: doc.id, ...doc.data() });
						});
						// console.log('Array : ', postsArray)
						setPosts(postsArray);
						setLoading(false);
					},
					(error) => {
						console.log(error);
					},
				);
		} else {
			console.log('error');
		}
		// console.log(posts);
		setLoading(false);
	};

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Functions

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
						<Slide easing="ease">
							<div></div>
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
