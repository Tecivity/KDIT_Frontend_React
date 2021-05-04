//React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MdCancel } from 'react-icons/md';

//External
import algoliasearch from 'algoliasearch/lite';
import { stripHtml } from 'string-strip-html';
//CSS
import './index.css';

import {
	InstantSearch,
	connectHighlight,
	ClearRefinements,
	RefinementList,
	Configure,
	Pagination,
	connectSearchBox,
	connectHits,
} from 'react-instantsearch-dom';

//Search API
const searchClient = algoliasearch(
	'JG2RW7MF5D',
	'512e0cbf39c768a80f6c1f95f8099be2',
);

//Custom Hits
const Hits = ({ hits }) => {
	const history = useHistory();

	return (
		<div className="hitContainer">
			{hits.map((hit) => (
				<p
					key={hit.objectID}
					className="hit"
					onClick={() => {
						if (
							history.location.pathname ===
							`/post/${hit.objectID}`
						) {
							window.location.reload();
						} else {
							history.push(`/post/${hit.objectID}`);
						}
					}}
				>
					{stripHtml(hit.content).result}
				</p>
			))}
		</div>
	);
};
const CustomHits = connectHits(Hits);

//Custom SearchBar
const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
	//States
	const [showHit, setShowHit] = useState(false);

	//Effects

	//Functions
	const handleOnClick = (e) => {
		setShowHit(true);
	};

	const handleBlur = (e) => {
		setShowHit(false);
	};

	return (
		<div className="searchContainer">
			<div className="searchBarPane">
				<input
					type="search"
					value={currentRefinement}
					onChange={(event) => refine(event.currentTarget.value)}
					className="searchBar"
					placeholder="Search..."
					onClick={handleOnClick}
				/>
				<button onClick={handleBlur} className="clearBt">
					<MdCancel size="30px" style={{ fill: 'lightgrey' }} />
				</button>
			</div>

			{showHit && <CustomHits />}
		</div>
	);
};
const CustomSearchBox = connectSearchBox(SearchBox);

//Component SearchBar
const SearchBar = () => {
	return (
		<InstantSearch searchClient={searchClient} indexName="posts">
			<CustomSearchBox />
			<Configure hitsPerPage={4} />
		</InstantSearch>
	);
};

export default SearchBar;
