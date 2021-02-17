import { UserRole } from '@modules/users/infra/typeorm/entities/User';

export interface IUserContext {
  id: string;
  roles?: UserRole[];
}

export default interface IContext {
  user: IUserContext;
  [key: string]: any;
}
