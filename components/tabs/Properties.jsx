import Link from 'next/link';
import React from 'react';
import { items_offer_data } from '../../data/items_tabs_data';

const Properties = () => {
	return (
		<>
			{/* <!-- Properties --> */}
			<div
			>
				<div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 rounded-t-2lg rounded-b-2lg rounded-tl-none border bg-white p-6 md:p-10">
					<div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4">
						{items_offer_data.map((item) => {
							const { id, img } = item;
							return (
								<img src={img} key={id}></img>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default Properties;
