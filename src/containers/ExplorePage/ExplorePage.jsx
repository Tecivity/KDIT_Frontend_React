//React
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import parse from 'html-react-parser';
import {
	InstantSearch,
	// SearchBox,
	// Hits,
	connectHighlight,
	ClearRefinements,
	RefinementList,
	Configure,
	// Pagination,
	connectSearchBox,
	connectHits,
	connectPagination,
	HitsPerPage,
} from 'react-instantsearch-dom';
//Components
import { SearchBar, Navbar, SideNavbar } from '../../components';
//External
import algoliasearch from 'algoliasearch/lite';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import ReactTimeAgo from 'react-time-ago';
//CSS
import './ExplorePage.css';

TimeAgo.addLocale(en);

//Custom Components
const searchClient = algoliasearch(
	'JG2RW7MF5D',
	'512e0cbf39c768a80f6c1f95f8099be2',
);

const CustomHits = connectHits(({ hits, indice }) => {
	//History
	const history = useHistory();

	return (
		<div className="explore-hitContainer">
			{hits.map((hit) => (
				<div key={hit.objectID} className="explore-hit">
					{indice === 'posts' && (
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
					)}
					{indice === 'sub_community' && (
						<div
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
								<h3 style={{ textAlign: 'center' }}>
									{hit.name}
								</h3>
								<h4 style={{ textAlign: 'center' }}>
									{hit.description}
								</h4>
							</div>
						</div>
					)}
					{indice === 'users' && (
						<div
							onClick={() => {
								history.push(`/profile/${hit.objectID}`);
							}}
						>
							<div className="explore-comInfo">
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
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
});

const CustomSearchBox = connectSearchBox(
	({ currentRefinement, refine, setIndice }) => {
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

const ExplorePage = () => {
	//States
	const [indice, setIndice] = useState('posts');

	return (
		<>
			<Navbar />
			<div className="explorePane">
				<InstantSearch searchClient={searchClient} indexName={indice}>
					<CustomSearchBox setIndice={setIndice} />
					{/* <CustomPagination /> */}
					<CustomHits indice={indice} />
					<Configure hitsPerPage={50} />
				</InstantSearch>
			</div>
			<SideNavbar />
		</>
	);
};

export default ExplorePage;
