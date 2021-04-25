import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import profilePic from '../../assets/Test.jpg';
import { SessionApi } from '../../hook/SessionApi'
import { useHistory } from 'react-router-dom'

const Post = ({ post, upVote, downVote }) => {
	const history = useHistory()
	const { user,session } = useContext(SessionApi);
	const defaultImage = 'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg'
	const [imageURL, setImageURL] = useState(user.photoURL)
	//States
	const [posts, setPosts] = useState(post);

	//Function
	const handlePostClick = () => {
		console.log('post clicked');
		history.push(`/post/${posts.id}`)
	};

	return (
			<div id={posts.id} className="postPane" onClick={handlePostClick}>
				<div className="infoPane">
					<div className="votePane">
						<button
							onClick={() => upVote(post)}
							className="voteUpBT"
						>
							⬆
						</button>

						{post.voteUp + post.voteDown}

						<button
							onClick={() => downVote(post)}
							className="voteDownBT"
						>
							⬇
						</button>
					</div>
					<p>Comments</p>
					<p>Re-post</p>
				</div>

				<div>
					<div className="post">
						<div>
						<img src={session ? imageURL : defaultImage}
							onError={() => setImageURL(defaultImage)}
							alt="profile picture"
							className="profilePic" />
						</div>

						<div className="postInfo">
							<div className="postBy">
								<p className="displayName">Display Name</p>
								<p className="username">@{post.userUID}</p>
								<p className="timestamp"> - {post.timeStamp}</p>
							</div>
							<div className="postContent">
								<p>{post.content}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
	);
};

export default Post;
