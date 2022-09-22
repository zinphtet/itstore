import { createContext, useReducer } from 'react';
import {
	ADD_CART,
	REMOVE_CART,
	TO_CART,
	TO_CART_ADD,
	TO_CART_REMOVE,
} from './actions';
import { addCartFun, removeCartFun, addedToCart } from '../lib/utils';

export const CartContext = createContext();
const initialState = {
	cartItems: [],
	confirmItems: [],
};
const cartReducer = (state, action) => {
	// console.log(state);
	switch (action.type) {
		case ADD_CART:
			return {
				...state,
				cartItems: addCartFun(state.cartItems, action.payload),
			};
		case REMOVE_CART:
			return {
				...state,
				cartItems: removeCartFun(state.cartItems, action.payload),
			};
		case TO_CART:
			return {
				...state,
				confirmItems: addedToCart(
					state.cartItems,
					state.confirmItems,
					action.payload
				),
			};
		case TO_CART_ADD:
			return {
				...state,
				confirmItems: addCartFun(state.confirmItems, action.payload),
			};
		case TO_CART_REMOVE:
			return {
				...state,
				confirmItems: removeCartFun(state.confirmItems, action.payload),
			};
	}
};
export const CartContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, initialState);
	return (
		<CartContext.Provider
			value={{
				state,
				dispatch,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

// return {
//     ...state,
//     cartItems: state.cartItems.map((item) => {
//         // if (!item) return { ...action.payload, quantity: 1 };
//         if (item.slug === action.payload.slug) {
//             return {
//                 ...item,
//                 quantity: item.quantity + 1,
//             };
//         }

//         return {
//             ...action.payload,
//             quantity: 1,
//         };
//     }),
// };
