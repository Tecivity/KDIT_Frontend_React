//React
import * as React from 'react';
import { Slide } from 'react-slideshow-image';
//Components
import SearchBar from '../SearchBar';
//External

//CSS
import './index.css';
import 'react-slideshow-image/dist/styles.css';

const SideNavbar = () => {
	return (
		<>
			<div className="side-navbar">
				<SearchBar />
				<div className="trends">
					<div>
						<h3 style={{ marginBottom: '0' }}>Posts</h3>
						<Slide easing="ease" style={{ margin: 'auto' }}>
							<div className="each-slide">
								<div>
									<h4>Post On Trend 1</h4>
									<h5>Usernam</h5>
									<p>Post Content</p>
								</div>
							</div>
							<div className="each-slide">
								<div>
									<h4>Post On Trend 2</h4>
								</div>
							</div>
							<div className="each-slide">
								<div>
									<h4>Post On Trend 3</h4>
								</div>
							</div>
						</Slide>
					</div>
					<div>
						<h3 style={{ marginBottom: '0' }}>Community</h3>
						<Slide easing="ease" style={{ margin: 'auto' }}>
							<div className="each-slide">
								<div>
									<h4>Community On Trend 1</h4>
									<p>Community Content</p>
								</div>
							</div>
							<div className="each-slide">
								<div>
									<h4>Community On Trend 2</h4>
								</div>
							</div>
							<div className="each-slide">
								<div>
									<h4>Community On Trend 3</h4>
								</div>
							</div>
						</Slide>
					</div>
				</div>
			</div>
		</>
	);
};

export default SideNavbar;
