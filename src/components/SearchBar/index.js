import React, { useState } from 'react';
import './index.css';
import algoliasearch from 'algoliasearch/lite';
import {
	InstantSearch,
	// SearchBox,
	// Hits,
	connectHighlight,
	ClearRefinements,
	RefinementList,
	Configure,
	Pagination,
	connectSearchBox,
	connectHits,
} from 'react-instantsearch-dom';

const searchClient = algoliasearch(
	'JG2RW7MF5D',
	'512e0cbf39c768a80f6c1f95f8099be2',
);

const Hits = ({ hits }) => (
	<div className="hitContainer">
		{hits.map((hit) => (
			<p key={hit.objectID} className="hit">
				{hit.post_title}
			</p>
		))}
	</div>
);

const CustomHits = connectHits(Hits);

const SearchBox = ({ currentRefinement, isSearchStalled, refine }) => {
	//States
	const [showHit, setShowHit] = useState(false);

	//Functions
	const handleOnClick = (e) => {
		setShowHit(true);
	};

	const handleBlur = (e) => {
		setShowHit(false);
	};

	return (
		<div className="searchContainer">
			<input
				type="search"
				value={currentRefinement}
				onChange={(event) => refine(event.currentTarget.value)}
				className="searchBar"
				placeholder="Search Something..."
				onClick={handleOnClick}
				onBlur={handleBlur}
			/>

			{showHit && <CustomHits />}
		</div>
	);
};

const CustomSearchBox = connectSearchBox(SearchBox);

const SearchBar = () => {
	return (
		<InstantSearch searchClient={searchClient} indexName="demo_media">
			<CustomSearchBox />
			<Configure hitsPerPage={4} />
		</InstantSearch>
	);
};

export default SearchBar;
