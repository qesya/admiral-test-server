import http from 'http';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import 'dotenv/config';

import { defs, resolvers } from './graphql';

const port = process.env.PORT || 8000;
const uri = process.env.MONGO_URL || '';

const app = express();
app.use(
	cors({
		origin: '*',
	})
); 
const httpServer = http.createServer(app);

console.log(uri);
console.log(port);

const loadTypeDefs = Object.values(defs).map((x) => x);
const loadResolvers = Object.values(resolvers).map((x) => x);

const createApolloServer = async () => {
	const apolloServer = new ApolloServer({
		schema: makeExecutableSchema({
			typeDefs: mergeTypeDefs(loadTypeDefs),
			resolvers: mergeResolvers(loadResolvers),
		}),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app, path: '/graphql' });

	await mongoose.connect(uri);

	httpServer.listen(port, () => {
		console.log(`🚀 Graphql is ready at http://localhost:${port}/graphql`);
	});
};

createApolloServer();
