import './style.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SessionApi } from '../../hook/SessionApi';
import {
	MdHome,
	MdSearch,
	MdGroup,
	MdHelp,
	MdInfo,
	MdAccountCircle,
} from 'react-icons/md';
import { useHistory, useParams } from 'react-router-dom';

export default function Navbar() {
	//States
	const [searchText, setSearchText] = useState('');
	const [mouseOver, setMouseOver] = useState({
		home: false,
		explore: false,
		community: false,
		help: false,
		about: false,
		profile: false,
	});

	//params
	const menu = window.location.pathname;

	//Context
	const { session, handleLogout } = React.useContext(SessionApi);

	//Functions

	return (
		<div className="navbar">
			<div className="content">
				<div className="menu">
					<Link
						to="/"
						className="siteName"
						onMouseOver={() =>
							setMouseOver({ ...mouseOver, home: true })
						}
						onMouseLeave={() =>
							setMouseOver({ ...mouseOver, home: false })
						}
						style={{
							transform: menu === '/' && 'scale(1.2)',
						}}
					>
						<MdHome
							size="30px"
							style={{
								fill:
									mouseOver.home || menu === '/'
										? '#f8640e'
										: 'black',
							}}
						/>
						<h4
							style={{
								color: menu === '/' && '#f8640e',
							}}
						>
							Home
						</h4>
					</Link>

					<Link
						to="/explore"
						className="siteName"
						onMouseOver={() =>
							setMouseOver({ ...mouseOver, explore: true })
						}
						onMouseLeave={() =>
							setMouseOver({ ...mouseOver, explore: false })
						}
						style={{
							transform: menu === '/explore' && 'scale(1.2)',
						}}
					>
						<MdSearch
							size="30px"
							style={{
								fill:
									mouseOver.explore || menu === '/search'
										? '#f8640e'
										: 'black',
							}}
						/>
						<h4
							style={{
								color: menu === '/explore' && '#f8640e',
							}}
						>
							Explore
						</h4>
					</Link>

					<Link
						to="/community"
						className="siteName"
						onMouseOver={() =>
							setMouseOver({ ...mouseOver, community: true })
						}
						onMouseLeave={() =>
							setMouseOver({ ...mouseOver, community: false })
						}
						style={{
							transform: menu === '/community' && 'scale(1.2)',
						}}
					>
						<MdGroup
							size="30px"
							style={{
								fill:
									mouseOver.community || menu === '/community'
										? '#f8640e'
										: 'black',
							}}
						/>
						<h4
							style={{
								color: menu === '/community' && '#f8640e',
							}}
						>
							Community
						</h4>
					</Link>

					<Link
						to="/help"
						className="siteName"
						onMouseOver={() =>
							setMouseOver({ ...mouseOver, help: true })
						}
						onMouseLeave={() =>
							setMouseOver({ ...mouseOver, help: false })
						}
						style={{
							transform: menu === '/help' && 'scale(1.2)',
						}}
					>
						<MdHelp
							size="30px"
							style={{
								fill:
									mouseOver.help || menu === '/help'
										? '#f8640e'
										: 'black',
							}}
						/>
						<h4
							style={{
								color: menu === '/help' && '#f8640e',
							}}
						>
							Help
						</h4>
					</Link>

					<Link
						to="/about"
						className="siteName"
						onMouseOver={() =>
							setMouseOver({ ...mouseOver, about: true })
						}
						onMouseLeave={() =>
							setMouseOver({ ...mouseOver, about: false })
						}
						style={{
							transform: menu === '/about' && 'scale(1.2)',
						}}
					>
						<MdInfo
							size="30px"
							style={{
								fill:
									mouseOver.about || menu === '/about'
										? '#f8640e'
										: 'black',
							}}
						/>
						<h4
							style={{
								color: menu === '/about' && '#f8640e',
							}}
						>
							About Us
						</h4>
					</Link>

					<Link
						to="/profile"
						className="siteName"
						onMouseOver={() =>
							setMouseOver({ ...mouseOver, profile: true })
						}
						onMouseLeave={() =>
							setMouseOver({ ...mouseOver, profile: false })
						}
						style={{
							transform: menu === '/profile' && 'scale(1.2)',
						}}
					>
						<MdAccountCircle
							size="30px"
							style={{
								fill:
									mouseOver.profile || menu === '/profile'
										? '#f8640e'
										: 'black',
							}}
						/>
						<h4
							style={{
								color: menu === '/profile' && '#f8640e',
							}}
						>
							Profile
						</h4>
					</Link>
				</div>
				{session ? (
					<Link to="/auth" onClick={() => handleLogout()}>
						<button className="create-button">Logout</button>
					</Link>
				) : (
					<Link to="/auth">
						<button className="create-button">Login</button>
					</Link>
				)}
			</div>
		</div>
	);
}
