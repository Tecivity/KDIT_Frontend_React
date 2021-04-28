import React, { useState, useEffect } from 'react';
import './index.css';

const FullSubCom = ({ subCom }) => {
	// const [subCom,setSubCom] = useState({})

	useEffect(() => {
		console.log(subCom)
	}, [])

	return (
		<div className="fullComPane">
			<div className="comInfoPane">
				<div className="subComImagePane">
					<img src={subCom.photoURL} alt="" className="subComImg" />
				</div>
				<h2>{subCom.name}</h2>
				<h2>{subCom.description}</h2>
				<button>Edit</button>
				<button>Follow</button>
			</div>
		</div>
	);
};

export default FullSubCom;
