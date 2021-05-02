//React
import React, { useContext, useState } from 'react';
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
import { SearchBar, Navbar } from '../../components';
//External
import algoliasearch from 'algoliasearch/lite';
import { stripHtml } from 'string-strip-html';
//CSS
import './ExplorePage.css';

//Custom Components
const searchClient = algoliasearch(
	'JG2RW7MF5D',
	'512e0cbf39c768a80f6c1f95f8099be2',
);

const CustomHits = connectHits(({ hits, indice }) => (
	<div className="explore-hitContainer">
		{hits.map((hit) => (
			<p key={hit.objectID} className="explore-hit">
				{indice === 'posts' && (
					<div className="explore-postHitPane">
						<div className="explore-userImgPane">
							<h4>Post Owner Image</h4>
						</div>
						<div className="explore-postPane">
							<div className=" explore-postInfoPane">
								<h4 style={{ display: 'inline' }}>
									{String(hit.userUID)}
								</h4>
								<p
									style={{
										display: 'inline',
										marginLeft: '0.3rem',
									}}
								>
									- {hit.timeStamp}
								</p>
							</div>
							<div className="explore-postContentPane">
								{parse(String(hit.content))}
							</div>
						</div>
					</div>
				)}
				{indice === 'sub_community' && (
					<div>
						<div className="explore-comInfo">
							<h1>Com Img</h1>
							{hit.name}
							<h4>com des.</h4>
						</div>
					</div>
				)}
				{indice === 'users' && (
					<div>
						<div className="explore-comInfo">
							<h1>User Img</h1>
							{hit.email}
							<h4>user bio.</h4>
						</div>
					</div>
				)}
			</p>
		))}
	</div>
));

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

const CustomPagination = connectPagination(
	({ currentRefinement, nbPages, refine, createURL }) => (
		<div className="explore-pagesPane">
			{new Array(nbPages).fill(null).map((_, index) => {
				const page = index + 1;
				const style = {
					fontWeight: currentRefinement === page ? 'bold' : '',
				};

				return (
					<a
						key={index}
						href={createURL(page)}
						style={style}
						onClick={(event) => {
							event.preventDefault();
							refine(page);
						}}
						className="explore-page"
					>
						{page}
					</a>
				);
			})}
		</div>
	),
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
					<CustomPagination />
					<CustomHits indice={indice} />
					<Configure hitsPerPage={3} />
				</InstantSearch>
			</div>
		</>
	);
};

export default ExplorePage;
