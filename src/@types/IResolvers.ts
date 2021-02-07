import IContext from './IContext';

export interface IResolverArgs<Root = any, Args = any> {
  root: Root;
  input: Args;
  context?: IContext;
}

type IResolverFn = (parent: any, args: any, ctx: IContext) => any;

interface IResolverMap {
  [field: string]: IResolverFn | IResolverMap;
}
export default interface IResolvers {
  [field: string]: IResolverMap;
}
