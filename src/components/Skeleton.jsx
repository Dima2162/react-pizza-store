import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#adadad"
		foregroundColor="#e9e2e2">
		<circle cx="139" cy="129" r="128" />
		<rect x="1" y="272" rx="10" ry="10" width="274" height="28" />
		<rect x="0" y="314" rx="10" ry="10" width="280" height="88" />
		<rect x="1" y="432" rx="10" ry="10" width="95" height="30" />
		<rect x="129" y="420" rx="25" ry="25" width="152" height="45" />
	</ContentLoader>
);

export default Skeleton;
