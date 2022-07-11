import { Context } from 'apollo-server-core';
import { ObjectId } from 'mongodb';
import Product from '../../db/product';

interface IProductCreate {
	type: 'virtual' | 'physical';
	name: string;
	minQty: number;
	price: number;
}

interface IProductUpdate {
	id: string;
	type?: 'virtual' | 'physical';
	name?: string;
	minQty?: number;
	price: number;
}

const productResolvers = {
	Query: {
		products: async () => {
			try {
				const products = await Product.find();
				return products;
			} catch (err) {
				throw err;
			}
		},
		product: async (_: Context, args: { id: string }) => {
			try {
				const product = await Product.findOne({ _id: new ObjectId(args.id) });
				return product;
			} catch (error) {
				throw error;
			}
		},
	},

	Mutation: {
		createProduct: async (_: Context, { input }: { input: IProductCreate }) => {
			try {
				const product = new Product(input);
				const result = await product.save()
				return result;
			} catch (err) {
				throw err;
			}
		},
		updateProduct: async (_: Context, { input }: { input: IProductUpdate }) => {
			try {
				const { id, ...args } = input;
				const old = await Product.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: args });
				if (old) {
					const product = await Product.findOne({ _id: new ObjectId(old.id) });
					return product;
				}
				return null;
			} catch (err) {
				throw err;
			}
		},
	},
};

export default productResolvers;
