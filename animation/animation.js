import { motion } from 'framer-motion';

export const cartAni = {
	initial: {
		opacity: 0,
		scale: 0.5,
	},
	animate: {
		opacity: 1,
		scale: 1,
	},
	exit: {
		opacity: 0,
		scale: 0,
	},
};

export const cartConAni = {
	animate: {
		opacity: 1,
		transition: {
			staggerChildren: 0.2,
		},
	},
};

export const emptyCartAni = {
	initial: {
		opacity: 0,
		x: '50%',
	},
	animate: {
		opacity: 1,
		x: 0,
	},
};

export const cartPageAni = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: 0,
	},
};

export const cartRightAni = {
	initial: {
		opacity: 0,
		x: '50%',
	},
	animate: {
		opacity: 1,
		x: 0,
	},
	exit: {
		opacity: 0,
		x: '50%',
	},
};
