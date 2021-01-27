import { makeExecutableSchema } from 'apollo-server-express';
import { loadFilesSync, mergeTypeDefs } from 'graphql-tools';
import mergeResolvers from 'lodash.merge';

const typesArray = loadFilesSync('src/**/schemas/*.graphql', {
  recursive: true,
});

const resolversArray = loadFilesSync('src/**/resolvers/*.ts', {
  recursive: true,
});

const directivesArray = loadFilesSync('src/**/directives/*.ts', {
  recursive: true,
});

const schema = makeExecutableSchema({
  typeDefs: mergeTypeDefs(typesArray),
  resolvers: mergeResolvers(resolversArray),
  schemaDirectives: Object.assign({}, ...directivesArray),
});

export default schema;
