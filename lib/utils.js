export const findItem = (arr, payload) => {
	return arr.find((item) => item.slug === payload.slug);
};

export const addCartFun = (arr, payload) => {
	if (arr.length === 0) return [...arr, { ...payload, quantity: 2 }];

	const addedArr = arr.map((item) => {
		if (item.slug === payload.slug)
			return { ...item, quantity: item.quantity + 1 };
		return item;
	});
	if (!findItem(arr, payload))
		return [...addedArr, { ...payload, quantity: 2 }];
	return addedArr;
};

export const removeCartFun = (arr, payload) => {
	const removedCart = arr.map((item) => {
		if (item.slug === payload.slug) {
			if (item.quantity === 1) return 'remove';
			return {
				...item,
				quantity: item.quantity - 1,
			};
		}
		return item;
	});
	// console.log(removedCart);
	const filter = removedCart.filter((item) => item !== 'remove');
	return filter;
};

export const addedToCart = (arr1, arr2, payload) => {
	const fromPrev = arr1.find((item) => item.slug === payload.slug);

	if (fromPrev) {
		const found = false;
		const findAndOverWrite = arr2.map((item) => {
			if (item.slug === fromPrev.slug) {
				found = true;
				return {
					...item,
					quantity: fromPrev.quantity,
				};
			}
			return item;
		});
		if (found) return findAndOverWrite;
		return [...arr2, fromPrev];
	}
	if (!fromPrev) {
		arr1.push({ ...payload, quantity: 1 });
		return [...arr2, { ...payload, quantity: 1 }];
	}
};
