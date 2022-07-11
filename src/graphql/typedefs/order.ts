import { gql } from 'apollo-server-core';

const orderDefs = gql`
	type Order {
		id: ID!
		products: [ProductOrder]
		taxPercentage: Int
		total: Float
		vat: Float
		tax: Float
	}

	type ProductOrder {
		id: String!
		amount: Float
	}

	type GiftWrap {
		name: String
		charge: Int
	}

	input OrderCreateInput {
		products: [OrderProductInput]
		taxPercentage: Int!
		total: Int!
	}

	input OrderUpdateInput {
		id: ID!
		products: [OrderProductInput]
		giftWrap: GiftWrapInput
		taxPercentage: Int!
	}

	input OrderProductInput {
		id: String!
		qty: Int!
		giftWrap: GiftWrapInput
		total: Int!
	}

	input GiftWrapInput {
		name: String
		charge: Int
	}

	type Query {
		orders: [Order]
		order(id: ID!): Order
	}

	type Mutation {
		createOrder(input: OrderCreateInput!): Order!
	}
`;

export default orderDefs;
