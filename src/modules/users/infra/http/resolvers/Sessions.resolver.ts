import CreateSessionService from '@modules/users/services/CreateSessionService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { Arg, Mutation, Resolver } from 'type-graphql';

import Session, { CreateSessionInput } from '../schemas/Session.schema';

@Resolver(Session)
class SessionsResolver {
  @Mutation(() => Session)
  async createSession(
    @Arg('input') input: CreateSessionInput,
  ): Promise<Session> {
    const { email, password } = input;

    const createSessionService = container.resolve(CreateSessionService);

    const { user, token } = await createSessionService.execute({
      email,
      password,
    });

    return { user: classToClass(user), token };
  }
}

export default SessionsResolver;
