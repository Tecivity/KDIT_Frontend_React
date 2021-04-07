import React from 'react';
import { Navbar, SubComBox } from '../components';

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

	return (
		<>
			<Navbar />
			<div>
				{subComDatas.map((subCom) => {
					return <SubComBox subCom={subCom} />;
				})}
			</div>
		</>
	);
};

export default SubComPage;
