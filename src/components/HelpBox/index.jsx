//React
import React from 'react';
import Popup from 'reactjs-popup';
import { MdCancel } from 'react-icons/md';
//Externl
import parse from 'html-react-parser';
//CSS
import 'reactjs-popup/dist/index.css';
import './index.css';

const HelpBox = ({ id, question, answer, fullAnswer }) => {
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
								<h1
									style={{
										paddingBottom: '0.5rem',
										borderBottom: '1px solid lightgrey',
									}}
								>
									{question}
								</h1>
							</div>
							<div className="content">{parse(answer)}</div>

							<Popup
								trigger={
									<button
										className="seeMoreHelpBtn"
										style={{
											marginTop: '2rem',
											width: '70%',
										}}
									>
										Answer in detail
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
											<h1
												style={{
													paddingBottom: '0.5rem',
													borderBottom:
														'1px solid lightgrey',
												}}
											>
												{question}
											</h1>
										</div>
										<div className="content">
											{parse(fullAnswer)}
										</div>
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
