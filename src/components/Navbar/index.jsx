//React
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	MdHome,
	MdSearch,
	MdGroup,
	MdHelp,
	MdInfo,
	MdAccountCircle,
	MdWidgets,
} from 'react-icons/md';
import { BiLogOut, BiLogIn } from 'react-icons/bi';
import { useMediaQuery } from 'react-responsive';
//Components
import { SessionApi } from '../../hook/SessionApi';
//CSS
import './style.css';

export default function Navbar() {
	//States
	const [mouseOver, setMouseOver] = useState({
		home: false,
		explore: false,
		community: false,
		help: false,
		about: false,
		profile: false,
		admin: false,
	});

	//Media
	const isMobile = useMediaQuery({
		query: '(min-device-width: 1000px)',
	});

	//params
	const menu = window.location.pathname;

	//Context
	const { session, handleLogout, isAdmin } = React.useContext(SessionApi);

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
									mouseOver.explore || menu === '/explore'
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

					{isMobile && (
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
					)}

					{isMobile && (
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
					)}

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
					{isAdmin ? (
						<div>
							{isMobile && (
								<Link
									to="/admin"
									className="siteName"
									onMouseOver={() =>
										setMouseOver({
											...mouseOver,
											admin: true,
										})
									}
									onMouseLeave={() =>
										setMouseOver({
											...mouseOver,
											admin: false,
										})
									}
									style={{
										transform:
											menu === '/admin' && 'scale(1.2)',
									}}
								>
									<MdWidgets
										size="30px"
										style={{
											fill:
												mouseOver.admin ||
												menu === '/admin'
													? '#f8640e'
													: 'black',
										}}
									/>
									<h4
										style={{
											color:
												menu === '/admin' && '#f8640e',
										}}
									>
										Manage
									</h4>
								</Link>
							)}
						</div>
					) : (
						<></>
					)}
				</div>
				{session ? (
					<Link to="/auth" onClick={() => handleLogout()}>
						<button className="create-button">
							<BiLogOut
								size="30px"
								style={{ fill: 'white', marginRight: '0.5rem' }}
							/>
							Logout
						</button>
					</Link>
				) : (
					<Link to="/auth">
						<button className="create-button">
							<BiLogIn
								size="30px"
								style={{ fill: 'white', marginRight: '0.5rem' }}
							/>
							Login
						</button>
					</Link>
				)}
			</div>
		</div>
	);
}
