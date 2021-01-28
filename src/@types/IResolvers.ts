import IContext from './IContext';

type IResolverFn = (parent: any, args: any, ctx: IContext) => any;

interface IResolverMap {
  [field: string]: IResolverFn | IResolverMap;
}
export default interface IResolvers {
  [field: string]: IResolverMap;
}