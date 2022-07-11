import { Context } from 'apollo-server-core';
import { ObjectId } from 'mongodb';
import Order from '../../db/order';

interface IOrderCreate {
	products: {
		id: string;
		qty: number;
		total: number;
		giftWrap: {
			name: string;
			charge: number;
		};
	}[];
	taxPercentage: number;
	total: number;
}

const orderResolvers = {
	Query: {
		orders: async () => {
			try {
				const orders = await Order.find();
				return orders;
			} catch (err) {
				throw err;
			}
		},
		order: async (_: Context, args: { id: string }) => {
			try {
				const product = await Order.findOne({ _id: new ObjectId(args.id) });
				return product;
			} catch (error) {
				throw error;
			}
		},
	},

	Mutation: {
		createOrder: async (_: Context, { input }: { input: IOrderCreate }) => {
			try {
				const products = input.products.map((product) => product);
				const total = input.total;
				const tax = total * (input.taxPercentage / 100);
				const vat = total + tax;
				const order = new Order({ ...input, products, total, vat, tax });
				const result = await order.save();
				return result;
			} catch (err) {
				throw err;
			}
		},
	},
};

export default orderResolvers;
