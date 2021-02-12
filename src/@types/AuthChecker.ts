import { ResolverData } from 'type-graphql';

/* eslint-disable @typescript-eslint/ban-types */
export type AuthChecker<ContextType = {}, Data = any> = (
  resolverData: ResolverData<ContextType>,
  data: Data,
) => boolean | Promise<boolean>;
