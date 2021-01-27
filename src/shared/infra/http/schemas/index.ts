import { buildSchemaSync } from 'type-graphql';
import path from 'path';

const schema = buildSchemaSync({
  resolvers: [path.resolve('src', '**', '*.resolver.{js,ts}')],
  emitSchemaFile: true,
});

export default schema;
