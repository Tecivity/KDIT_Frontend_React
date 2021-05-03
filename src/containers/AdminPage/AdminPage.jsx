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
import { SearchBar, Navbar } from '../../components';
//External
import algoliasearch from 'algoliasearch/lite';
import { stripHtml } from 'string-strip-html';
//CSS
import '../ExplorePage/ExplorePage';
// import './AdminPage';

//Custom Components
const searchClient = algoliasearch(
	'JG2RW7MF5D',
	'512e0cbf39c768a80f6c1f95f8099be2',
);

const CustomHits = connectHits(({ hits, indice }) => {
	const history = useHistory();

	return (
		<div className="explore-hitContainer">
			{hits.map((hit) => (
				<div key={hit.objectID} className="explore-hit">
					{indice === 'posts' && (
						<div>
							<div className="explore-postHitPane">
								<div className="explore-postPane">
									<div className=" explore-postInfoPane">
										<p
											style={{
												display: 'inline',
												marginLeft: '0.3rem',
											}}
										>
											{hit.timeStamp}
										</p>
									</div>
									<div className="explore-postContentPane">
										{parse(hit.content)}
									</div>
								</div>
							</div>
							<div
								style={{
									borderTop: '1px solid black',
								}}
							>
								<h4>Reasons For Reporting </h4>
								<button>Delete</button>
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
								<h1>Com Img</h1>
								{hit.name}
								<h4>com des.</h4>
							</div>
							<div style={{ marginLeft: '1rem' }}>
								<h4>Reasons For Reporting </h4>
								<button>Delete</button>
							</div>
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
								<h1>User Img</h1>
								{hit.email}
								<h4>user bio.</h4>
							</div>
							<div style={{ marginLeft: '1rem', width: '50%' }}>
								<h4>Reasons For Reporting </h4>
								<button>BAN</button>
							</div>
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
