import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const giftWrapSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	charge: {
		type: Number,
		required: true,
	},
});

const productOrderSchema = new Schema({
	id: {
		type: String,
		required: true,
	},
	giftWrap: giftWrapSchema,
	qty: Number,
});

const orderSchema = new Schema({
	products: [productOrderSchema],
	taxPercentage: {
		type: Number,
		default: 5,
		min: 0,
	},
	total: {
		type: Number,
		required: true,
	},
	vat: {
		type: Number,
		required: true,
	},
	tax: {
		type: Number,
		required: true,
		min: 0,
	},
});

export default mongoose.model('Order', orderSchema);
