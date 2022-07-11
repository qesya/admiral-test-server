import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const productSchema = new Schema({
	type: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	minQty: {
		type: Number,
		required: true,
		min: 1,
	},
	price: {
		type: Number,
		required: true,
		min: 0,
	},
});

export default mongoose.model('Product', productSchema);
