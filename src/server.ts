import * as http from 'http';
import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import { ApolloServer } from 'apollo-server-lambda';
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

const loadTypeDefs = Object.values(defs).map((x) => x);
const loadResolvers = Object.values(resolvers).map((x) => x);

const createApolloServer = async () => {
	await mongoose.connect(uri);
	const apolloServer = new ApolloServer({
		schema: makeExecutableSchema({
			typeDefs: mergeTypeDefs(loadTypeDefs),
			resolvers: mergeResolvers(loadResolvers),
		}),
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});
	apolloServer.applyMiddleware({ app, path: '/graphql' });

	return apolloServer;
};

export const handler = await createApolloServer();
