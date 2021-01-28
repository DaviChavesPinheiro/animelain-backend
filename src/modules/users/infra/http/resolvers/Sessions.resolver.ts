import CreateSessionService from '@modules/users/services/CreateSessionService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, Mutation, Resolver } from 'type-graphql';

import Session, { CreateSessionInput } from '../schemas/Sessions.schema';

@Resolver(Session)
class SessionsResolver {
  @Mutation(() => Session)
  async createSession(@Arg('data') data: CreateSessionInput): Promise<Session> {
    const { email, password } = data;

    const createSessionService = container.resolve(CreateSessionService);

    const { user, token } = await createSessionService.execute({
      email,
      password,
    });

    return { user: classToClass(user), token };
  }
}

export default SessionsResolver;
