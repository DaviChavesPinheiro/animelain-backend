import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import CreateSessionService from './CreateSessionService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: IUsersRepository;
let createSessionService: CreateSessionService;
let createUserService: CreateUserService;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createSessionService = new CreateSessionService(fakeUsersRepository);
    createUserService = new CreateUserService(fakeUsersRepository);
  });

  it('should not be able to create a session of a user that do not exist', async () => {
    await expect(
      createSessionService.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to create a session with wrong password', async () => {
    await createUserService.execute({
      name: 'John',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      createSessionService.execute({
        email: 'johndoe@example.com',
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should be able to create a session', async () => {
    const user = await createUserService.execute({
      name: 'John',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const response = await createSessionService.execute({
      email: 'johndoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});
