import { gql } from 'apollo-server-core';

const productDefs = gql`
  type Product {
    id: ID!
    type: String
    name: String
    minQty: Int
    price: Int
  }

  type Query {
    products: [Product]
    product(id: ID!): Product
  }

  input ProductCreateInput {
    type: String!
    name: String!
    minQty: Int!
    price: Int!
  }

  input ProductUpdateInput {
    id: ID!
    type: String
    name: String
    minQty: Int
    price: Int
  }

  type Mutation {
    createProduct(input: ProductCreateInput!): Product!
    updateProduct(input: ProductUpdateInput!): Product
  }
`;

export default productDefs;
