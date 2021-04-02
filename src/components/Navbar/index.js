import './index.css';
import { Link } from 'react-router-dom';

export default function Navbar() {
	return (
		<div className="navbar">
			<div className="content">
				<header>
					<div>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/sub-community">Sub Community</Link>
							</li>
							<li>
								<Link to="/help">Help</Link>
							</li>
							<li>
								<Link to="/about">About Us</Link>
							</li>
							<li>
								<Link to="/profile">Profile</Link>
							</li>
						</ul>
					</div>
				</header>
			</div>
		</div>
	);
}
