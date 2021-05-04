//React
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import {
	InstantSearch,
	Configure,
	connectSearchBox,
	connectHits,
} from 'react-instantsearch-dom';
//Components
import { Navbar } from '../../components';
//External
import algoliasearch from 'algoliasearch/lite';
import ReactTimeAgo from 'react-time-ago';
//CSS
import '../ExplorePage/ExplorePage';
import { PostService } from '../../services';
// import './AdminPage';

//Custom Components
const searchClient = algoliasearch(
	'JG2RW7MF5D',
	'512e0cbf39c768a80f6c1f95f8099be2',
);

const CustomHits = connectHits(({ hits, indice }) => {
	const history = useHistory();

	const deletePost = async (id) => {
		if (!window.confirm('Are you sure for delete post ❓')) {
			// return console.log('Cancel delete.');
		}

		PostService.deletePost(id).then(() => {
			// console.log(id, ' deleted');
			window.location.reload();
		});
	};

	return (
		<div className="explore-hitContainer">
			{hits.map((hit) => (
				<div key={hit.objectID} className="explore-hit">
					{indice === 'posts' && (
						<div>
							<div
								className="explore-postHitPane"
								onClick={() => {
									history.push(`/post/${hit.objectID}`);
								}}
							>
								<div className="explore-postPane">
									<div className=" explore-postInfoPane">
										<div
											style={{
												display: 'inline',
												marginLeft: '0.3rem',
												paddingLeft: '1rem',
												paddingTop: '1rem',
											}}
										>
											{String(hit.timeStamp) !==
												'undefined' && (
												<ReactTimeAgo
													date={String(hit.timeStamp)}
													locale="en-US"
													style={{ color: 'grey' }}
												/>
											)}{' '}
											•{' '}
											<span
												style={{
													fontSize: '0.8rem',
													color: 'lightgrey',
												}}
											>
												{new Date(
													hit.timeStamp,
												).toLocaleString([], {
													dateStyle: 'long',
													timeStyle: 'short',
												})}
											</span>
										</div>
									</div>
									<div
										className="explore-postContentPane"
										style={{ paddingLeft: '1rem' }}
									>
										{parse(String(hit.content))}
									</div>
								</div>
							</div>
							<div
								style={{
									borderTop: '1px solid black',
									paddingLeft: '1rem',
									paddingBottom: '1rem',
								}}
							>
								<button
									onClick={() => deletePost(hit.objectID)}
								>
									Delete
								</button>
							</div>
						</div>
					)}
					{indice === 'sub_community' && (
						<div
							style={{ display: 'flex', flexDirection: 'column' }}
							onClick={() => {
								history.push(`/community/${hit.objectID}`);
							}}
						>
							<div className="explore-comInfo">
								<div className="subComBackgroundPane">
									<img
										src={hit.bannerURL}
										alt=""
										width="100%"
										height="130%"
										style={{
											margin: '0',
											objectFit: 'cover',
											borderRadius: '0.5rem 0.5rem 0 0',
											zIndex: '20',
										}}
									/>
								</div>
								<div className="subComImagePane">
									<img
										src={hit.photoURL}
										alt=""
										className="subComImg"
									/>
								</div>
								<h3>{hit.name}</h3>
								<h4>{hit.description}</h4>
							</div>
							<div
								style={{
									borderTop: '1px solid black',
									paddingLeft: '1rem',
								}}
							></div>
						</div>
					)}
					{indice === 'users' && (
						<div
							style={{ display: 'flex', flexDirection: 'column' }}
							onClick={() => {
								history.push(`/profile/${hit.objectID}`);
							}}
						>
							<div className="explore-comInfo">
								<div className="subComBackgroundPane">
									<img
										src={hit.bannerURL}
										alt=""
										width="100%"
										height="130%"
										style={{
											margin: '0',
											objectFit: 'cover',
											borderRadius: '1rem 1rem 0 0',
											zIndex: '20',
										}}
									/>
								</div>
								<div className="subComImagePane">
									<img
										src={hit.photoURL}
										alt=""
										className="subComImg"
									/>
								</div>
								<h3>{hit.displayName}</h3>
								<p>{hit.bio}</p>
							</div>
							<div
								style={{
									borderTop: '1px solid black',
									width: '50%',
									paddingLeft: '1rem',
								}}
							></div>
						</div>
					)}
				</div>
			))}
		</div>
	);
});

const CustomSearchBox = connectSearchBox(
	({ currentRefinement, isSearchStalled, refine, setIndice }) => {
		//Functions
		const changeIndice = (e) => {
			setIndice(e.target.value);
		};

		return (
			<div className="explore-searchContainer">
				<input
					type="search"
					value={currentRefinement}
					onChange={(event) => refine(event.currentTarget.value)}
					className="explore-searchBar"
					placeholder="Search Something..."
				/>

				<div className="explore-searchOptionPane">
					<select
						name="indices"
						id=""
						className="explore-dropdown"
						onChange={changeIndice}
					>
						<option value="posts">Post</option>
						<option value="sub_community">Community</option>
						<option value="users">User</option>
					</select>
				</div>
			</div>
		);
	},
);

const AdminPage = () => {
	//States
	const [indice, setIndice] = useState('posts');

	return (
		<>
			<Navbar />
			<div className="explorePane" style={{ width: '60%' }}>
				<InstantSearch searchClient={searchClient} indexName={indice}>
					<CustomSearchBox setIndice={setIndice} />
					{/* <CustomPagination /> */}
					<CustomHits indice={indice} />
					<Configure hitsPerPage={500} />
				</InstantSearch>
			</div>
		</>
	);
};

export default AdminPage;
