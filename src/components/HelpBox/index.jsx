import './index.css';
import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { MdCancel } from 'react-icons/md';

const HelpBox = ({ id, question, answer }) => {
	return (
		<>
			<div id={id} className="helpBox">
				<h2 style={{ textAlign: 'center' }}>{question}</h2>

				{/* Popup Help  */}
				<Popup
					trigger={
						<button className="seeMoreHelpBtn">See More</button>
					}
					modal
				>
					{(close) => (
						<div className="modal">
							<div className="close" onClick={close}>
								<MdCancel
									size="30px"
									style={{ fill: '#f48c51' }}
								/>
							</div>
							<div className="header">
								<h1>{question}</h1>
							</div>
							<div className="content">{answer}</div>

							<Popup
								trigger={
									<button
										className="seeMoreHelpBtn"
										style={{ marginTop: '2rem' }}
									>
										See More
									</button>
								}
								modal
								className="subPopup"
							>
								{(close) => (
									<div className="modal">
										<div className="close" onClick={close}>
											<MdCancel
												size="30px"
												style={{ fill: '#f48c51' }}
											/>
										</div>
										<div className="header">
											<h1>{question}</h1>
										</div>
										<div className="content">{answer}</div>
									</div>
								)}
							</Popup>
						</div>
					)}
				</Popup>
			</div>
		</>
	);
};

export default HelpBox;
