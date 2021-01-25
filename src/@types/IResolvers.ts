import IContext from './IContext';

type IResolverFn = (
  parent: Record<string, any>,
  args: Record<string, any>,
  ctx: IContext,
) => any;

interface IResolverMap {
  [field: string]: IResolverFn;
}
export default interface IResolvers {
  [field: string]: IResolverMap;
}
