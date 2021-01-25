/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-param-reassign */
import {
  AuthenticationError,
  SchemaDirectiveVisitor,
} from 'apollo-server-express';
import { GraphQLField, defaultFieldResolver } from 'graphql';
import IContext from '../../../../../@types/IContext';

export class AuthDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field: GraphQLField<any, any>) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async (...args) => {
      const requiresRoles = this.args.requiresRoles as string[];

      const context = args[2] as IContext;

      requiresRoles.forEach(role => {
        if (!context.user?.roles.includes(role)) {
          throw new AuthenticationError('not authorized');
        }
      });

      return resolve.apply(this, args);
    };
  }
}

export default { auth: AuthDirective };
