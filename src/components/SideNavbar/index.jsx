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
			answer:
				"<p>&#8226 Yes — you'll just need to create an account!</p>",
			fullAnswer:
				"<p>&#8226 Due to quality control of the content and prevention of cyberattack, we require the participant that wants to share or be part of this community conversation to make an account so we can better identify the owner and prevent the intervention of non-human activity (i.e bot).</p><p>&#8226 In order to create the account to access the ability to post and vote on this site, the participant requires to be part of King Mongkut's Institute of Technology Ladkrabang personal or student. With the electronic email with @kmitl.ac.th domain, you can do the manual sign-up with your email or sign up with the google authentication. The account will have no difference between sign up with or without google authentication.</p><p>&#8226 In case you don't have an account or possess no ability to make one, you can still browse the entire Nisit content but you can't participate in them.</p>",
		},
		{
			id: 5,
			question: 'How do I format my comment or post?',
			answer:
				'<p>&#8226 You can format the post but not the comment. By using the provided editor you can customize your post with a wide range of options and look. Our editor which we provide is quite straight forward so you should figure it out in no time! Visit answer in the detail section to learn more information.',
			fullAnswer:
				'<p>&#8226 Classic editor is what we use to provide rich text editor for our site — a toolbar with an editing area placed in a specific position on the page, usually as a part of a form that you use to submit some content to the server.</p><p>&#8226 The toolbar is now always visible when the user scrolls the page down.</p><p>&#8226 By default the editor now grows automatically with the content.</p><p>&#8226 Inserting images into the content is now very intuitive, with all technical aspects (uploading, resizing) hidden from the user experience. No more complex dialogs!.</p>',
		},
		{
			id: 6,
			question:
				'I made a mistake in my post or comment, how can I edit it?',
			answer:
				'<p>&#8226 You can edit your post at any time by clicking the edit button on the top right of your post or comment, after that the editor will pop-up just like when you want to submit your post or comment in the first place. You can change your content and make a change to your post then submit or click cancel to abort this operation.</p>',
			fullAnswer:
				'<p>&#8226 The submission post can be edited. However, you can simply delete it and resubmit it. The sooner you do this, the less likely you will lose any votes or comments.</p><p>&#8226 We are not encouraged to make changes to your post very often because it can mislead the viewer who visits your content.</p><p>&#8226 The submission timestamp of the post or comment which will initiate the first time when the post or comment is submitted will not and cannot be changed under any circumstances, this is the prevention measure to the user who aim to exploit the filter and sorting of this site by trying to push the older or outdated content to the public eye.</p><p>&#8226 You can edit your post at any time by clicking the edit button on the top right of your post or comment, after that the editor will pop-up just like when you want to submit your post or comment in the first place. You can change your content and make a change to your post then submit or click cancel to abort this operation.</p>',
		},
	];

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
					<div>
						<Slide easing="ease">
							<div
								className="each-slide"
								style={{ marginTop: '0.5rem' }}
							>
								<h4 style={{ marginTop: '0.5rem' }}>
									Search For A Community{' '}
								</h4>
								<p>
									Nisit is a very large site with millions of
									users and thousands of Community catering to
									nearly every topic imaginable so it can be a
									bit hard to find a community that fits your
									interest. To help you search for one, you
									can use their explore search which can be
									accessed by pressing ‘Explore’, located at
									the very left of the Navigation bar.
								</p>
							</div>
							<div
								className="each-slide"
								style={{ marginTop: '0.5rem' }}
							>
								<h4 style={{ marginTop: '0.5rem' }}>
									Create An Account And Follow
								</h4>
								<p>
									Probably the first thing you should do if
									you’re serious about getting into Nisit is
									to get an account. Not only will you be able
									to participate in the comments sections, you
									can subscribe to the different communities
									you find intruiging, so that they will
									appear on the home page. Plus, you will be
									able to unfollow from any of the default
									communities that you may not like, so their
									posts will no longer appear on your page.
								</p>
							</div>
						</Slide>
						<h3 style={{ marginBottom: '0', marginLeft: '1rem' }}>
							FAQ
						</h3>
						<Slide easing="ease">
							<div className="each-slide">{FAQ[0].question}</div>
						</Slide>
					</div>
				</div>
			</div>
		</>
	);
};

export default SideNavbar;
