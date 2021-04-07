import React from 'react';
import { Navbar, SubComBox } from '../components';
import { SessionApi } from '../hook/SessionApi';

const SubComPage = () => {
	//Datas
	const subComDatas = [
		{
			id: 1,
			name: 'กล้องฟิล์ม KMITL',
			description: 'สำหรับคนรักกล้องฟิล์มจ้า',
		},
		{
			id: 2,
			name: 'บาส KMITL',
			description: 'เล่นบาสกันเถอะไอพวกเวร',
		},
		{
			id: 3,
			name: 'ดนตรี KMITL',
			description: 'มาสร้างเสียงที่น่าฟังให้ทุกคนกันครับ อิอิ',
		},
		{
			id: 4,
			name: 'วิ่งแบบพี่ตูน',
			description: 'เจอกันสนามวิ่งทุกเย็นครับเด็กๆ',
		},
	];

	//Contexts
	const { session } = React.useContext(SessionApi);

	return (
		<>
			<Navbar />
			<div>
				{session ? (
					subComDatas.map((subCom) => {
						return <SubComBox subCom={subCom} />;
					})
				) : (
					<h1>Please Login to Follow our Sub-Community</h1>
				)}
			</div>
		</>
	);
};

export default SubComPage;
