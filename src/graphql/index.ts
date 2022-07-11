import productDefs from './typedefs/product';
import productResolvers from './resolvers/product';

import orderDefs from './typedefs/order';
import orderResolvers from './resolvers/order';

export const defs = {
	productDefs,
	orderDefs,
};

export const resolvers = {
	productResolvers,
	orderResolvers,
};
