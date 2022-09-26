import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import { useQuery } from '@apollo/client';
import { GET_SHOP } from '../lib/graphql';
import { motion } from 'framer-motion';
import { cartConAni } from '../animation/animation';

const Container = () => {
	const { data, loading, error } = useQuery(GET_SHOP);
	if (loading) return <div>Loading ... </div>;
	if (error) return <div>Error ... </div>;
	console.log(data);
	const shopData = data.shops.data;
	return (
		<ShopContainer variants={cartConAni} initial="initial" animate="animate">
			{shopData.map((item, idx) => (
				<Item key={idx} data={item} />
			))}
		</ShopContainer>
	);
};

export default Container;

const ShopContainer = styled(motion.div)`
	padding: 4rem 0;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
	grid-gap: 2rem;
`;
