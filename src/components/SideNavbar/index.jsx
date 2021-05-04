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
	const FAQ = [
		{
			id: 4,
			question: 'Can anyone post on Nisit?',
			answer: "Yes — you'll just need to create an account!",
		},
		{
			id: 5,
			question: 'How do I format my comment or post?',
			answer: 'You can format the post but not the comment.',
		},
		{
			id: 6,
			question:
				'I made a mistake in my post or comment, how can I edit it?',
			answer:
				' You can edit your post at any time by clicking the edit button on the top right of your post or comment',
		},
	];

	//States
	const [posts, setPosts] = useState([]);
	const [post, setPost] = useState();

	//Effects
	useEffect(() => {
		fetchData();
	}, []);

	//Context
	const { user, loading, setLoading, userInfo, authListener } = useContext(
		SessionApi,
	);

	//Functions
	const fetchData = async () => {};

	//Effects
	useEffect(() => {
		fetchData();
	}, [userInfo]);

	//Functions

	return (
		<>
			<div className="side-navbar">
				<SearchBar />
				<div className="trends">
					<Slide easing="ease">
						<div
							className="each-slide"
							style={{ marginTop: '0.5rem' }}
						>
							<h4
								style={{
									marginTop: '0.5rem',
									borderBottom: '2px solid black',
								}}
							>
								Search For A Community{' '}
							</h4>
							<p>
								Nisit is a very large site with millions of
								users and thousands of Community catering to
								nearly every topic imaginable so it can be a bit
								hard to find a community that fits your
								interest. To help you search for one, you can
								use their explore search which can be accessed
								by pressing ‘Explore’, located at the very left
								of the Navigation bar.
							</p>
						</div>
						<div
							className="each-slide"
							style={{ marginTop: '0.5rem' }}
						>
							<h4
								style={{
									marginTop: '0.5rem',
									borderBottom: '2px solid black',
								}}
							>
								Create An Account And Follow
							</h4>
							<p>
								Probably the first thing you should do if you’re
								serious about getting into Nisit is to get an
								account. Not only will you be able to
								participate in the comments sections, you can
								subscribe to the different communities you find
								intruiging, so that they will appear on the home
								page. Plus, you will be able to unfollow from
								any of the default communities that you may not
								like, so their posts will no longer appear on
								your page.
							</p>
						</div>
						<div
							className="each-slide"
							style={{ marginTop: '0.5rem' }}
						>
							<h4
								style={{
									marginTop: '0.5rem',
									borderBottom: '2px solid black',
								}}
							>
								You Need To Login
							</h4>
							<p>
								It may seem a little counterintuitive, but the
								most surefire way to see the best that Nisit has
								to offer is by going further in. If you don't
								have an account, you can sign in with
								@kmitl.ac.th google account and start on the
								standard "home page". You can still explore the
								community and find the thing you are interested
								in, which tends to be the broadest (and
								popular).
							</p>
						</div>
						<div
							className="each-slide"
							style={{ marginTop: '0.5rem' }}
						>
							<h4
								style={{
									marginTop: '0.5rem',
									borderBottom: '2px solid black',
								}}
							>
								If There Isn’t a Community For It, You Can Make
								One
							</h4>
							<p>
								If there isn’t a community for your skill,
								interest, or hobby (which gets rarer by the day
								as new pages are created), then you can create
								your own community page. But, and We say this
								from long experience, being a nisit moderator is
								very hard work. Especially if your community
								becomes extremely popular and the masses start
								pouring in. But there are many people who thrive
								in that kind of environment. So each to their
								own.
							</p>
						</div>
					</Slide>
				</div>
				<div style={{ width: '90%', margin: 'auto' }}>
					<h1
						style={{
							marginBottom: '0rem',
							background: '#f48c51',
							paddingLeft: '1rem',
							color: 'white',
							textAlign: 'center',
						}}
					>
						FAQ
					</h1>
					<div
						style={{
							border: '2px solid #f48c51',
							borderRadius: '0 0 2rem 2rem',
							textAlign: 'center',
						}}
					>
						<Slide easing="ease">
							<div className="each-slide">
								<h4>{FAQ[0].question}</h4>
								<p>{FAQ[0].answer}</p>
							</div>
							<div className="each-slide">
								<h4>{FAQ[1].question}</h4>
								<p>{FAQ[1].answer}</p>
							</div>
							<div className="each-slide">
								<h4>{FAQ[2].question}</h4>
								<p>{FAQ[2].answer}</p>
							</div>
						</Slide>
					</div>
				</div>
			</div>
		</>
	);
};

export default SideNavbar;
