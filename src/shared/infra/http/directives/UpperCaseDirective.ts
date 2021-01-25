/* eslint-disable no-param-reassign */
import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { GraphQLField, defaultFieldResolver } from 'graphql';

export class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (...args) => {
      const result = await resolve.apply(this, args);
      if (typeof result === 'string') {
        return result.toUpperCase();
      }
      return result;
    };
  }
}

export default { upper: UpperCaseDirective };
