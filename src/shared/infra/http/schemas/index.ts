import { buildSchemaSync, AuthChecker } from 'type-graphql';
import path from 'path';
import IContext from '../../../../@types/IContext';

const customAuthChecker: AuthChecker<IContext> = ({ context, args }, roles) => {
  let isAuthorized = false;

  roles.forEach(authorizedRole => {
    if (context.user.roles.includes(authorizedRole)) isAuthorized = true;
  });

  if (roles.includes('OWNER') && args.id && context.user.id === args.id)
    isAuthorized = true;

  return isAuthorized;
};

const schema = buildSchemaSync({
  resolvers: [path.resolve('src', '**', '*.resolver.{js,ts}')],
  emitSchemaFile: true,
  authChecker: customAuthChecker,
});

export default schema;
