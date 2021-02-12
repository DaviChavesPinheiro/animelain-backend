import { buildSchemaSync } from 'type-graphql';
import path from 'path';
import { UserRole } from '@modules/users/infra/typeorm/entities/User';
import IContext from '../../../../@types/IContext';
import { AuthChecker } from '../../../../@types/AuthChecker';

export interface IAuthCheckerData {
  roles: UserRole[];
  isOwner?: ({
    root,
    context,
    args,
  }: {
    root: any;
    context: IContext;
    args: any;
  }) => boolean;
}

const customAuthChecker: AuthChecker<IContext, IAuthCheckerData[]> = (
  { root, context, args },
  data,
) => {
  const { roles, isOwner } = data[0];

  let isAuthorized = false;

  // Check if is Owner
  if (
    roles.includes(UserRole.OWNER) &&
    isOwner &&
    isOwner({ args, context, root })
  ) {
    isAuthorized = true;
  }

  roles.forEach(authorizedRole => {
    if (context.user.roles?.includes(authorizedRole)) isAuthorized = true;
  });

  console.log({ root, context, args, data: data[0] });

  return isAuthorized;
};

const schema = buildSchemaSync({
  resolvers: [path.resolve('src', '**', '*.resolver.{js,ts}')],
  emitSchemaFile: true,
  authChecker: customAuthChecker,
});

export default schema;
