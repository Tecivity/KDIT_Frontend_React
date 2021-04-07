import './index.css';
import Post from './Post';
import PostForm from './PostForm';
import React, { useState, useEffect } from 'react';

export default function Card() {
	//Data
	const postsData = [
		{
			id: '5QvktrDxirff0j4z8cwn',
			userid: '02020222',
			content: 'testpost6',
			voteUp: 0,
			voteDown: 0,
			timeStamp: 'Sun Mar 21 2021 14:29:08 GMT+0700 (Indochina Time)',
		},
		{
			id: 'Eab52N1wqUddYkd9AwzP',
			userid: '02020222',
			content: 'testpost9',
			voteUp: 0,
			voteDown: 0,
			timeStamp: 'Mon Mar 22 2021 22:03:30 GMT+0700 (Indochina Time)',
		},
		{
			id: 'GX6An1Obo8JFoj4kXA80',
			userid: '48624862',
			content: 'Test Post From Poompong Computer😊',
			voteUp: 0,
			voteDown: 0,
			timeStamp: 'Mon Mar 22 2021 22:04:09 GMT+0700 (Indochina Time)',
		},
		{
			id: 'HaIIGRCLz4nuvoXRgauG',
			userid: '48624862',
			content: 'Test Post From Poompong Computer😊',
			voteUp: 0,
			voteDown: 0,
			timeStamp: 'Tue Mar 23 2021 15:33:13 GMT+0700 (Indochina Time)',
		},
		{
			id: 'UeNf5uXUdBeKFiDA1Q7T',
			userid: 'edfwsdfsdfsd',
			content: 'Test JA!',
			voteUp: 0,
			voteDown: 0,
			timeStamp: 'Mon Mar 22 2021 22:18:19 GMT+0700 (Indochina Time)',
		},
		{
			id: 'Y2t5WftNRWuuPqtClEMc',
			userid: 'edfwsdfsdfsd',
			content: 'Test JA 3!',
			voteUp: 0,
			voteDown: 7,
			timeStamp: 'Mon Mar 22 2021 22:18:37 GMT+0700 (Indochina Time)',
		},
		{
			id: 'dOxzVrcRZBnaW6WhhZS2',
			voteUp: 0,
			voteDown: 0,
			timeStamp: 'Mon Mar 22 2021 10:39:50 GMT+0700 (Indochina Time)',
		},
		{
			id: 'fpaeAZvD9G37QXq6j5ta',
			voteUp: 0,
			voteDown: 0,
			timeStamp: 'Mon Mar 22 2021 10:45:13 GMT+0700 (Indochina Time)',
		},
		{
			id: 'jQADdhIx29cSNZVDwjfU',
			userid: '02020222',
			content: 'testpost9',
			voteUp: 0,
			voteDown: 0,
			timeStamp: 'Sun Mar 21 2021 14:29:43 GMT+0700 (Indochina Time)',
		},
		{
			id: 'sn00MW55eRv4hRO5U6Dr',
			userid: 'l;sdjghlsdfgjkl;sdghj;sdolhj;',
			content: '=========',
			voteUp: 0,
			voteDown: 0,
			timeStamp: 'Mon Mar 22 2021 10:41:28 GMT+0700 (Indochina Time)',
		},
	];

	//States
	const [posts, setPosts] = useState(postsData);

	//Functions
	const updatePost = (newPost) => {
		console.log(newPost.content);
		const newPosts = [newPost, ...posts];
		setPosts(newPosts);
	};

	return (
		<div className="card">
			<PostForm updatePost={updatePost} />
			<div className="content">
				{posts.map((post) => {
					return <Post post={post} />;
				})}
			</div>
		</div>
	);
}
