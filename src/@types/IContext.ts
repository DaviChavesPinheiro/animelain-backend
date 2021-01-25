export interface IUserContext {
  id: string;
  roles: string[];
}

export default interface IContext {
  user: IUserContext;
}
