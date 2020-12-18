import AppError from '@shared/errors/AppError';
import fs from 'fs';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import IUsersRepository from '../repositories/IUsersRepository';
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUsersRepository: IUsersRepository;
let createUserService: CreateUserService;
let updateUserAvatarService: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    createUserService = new CreateUserService(fakeUsersRepository);
    updateUserAvatarService = new UpdateUserAvatarService(fakeUsersRepository);
  });

  it('should not be able to update an avatar of a non authenticated user', async () => {
    await expect(
      updateUserAvatarService.execute({
        user_id: 'some_random_id',
        avatarFilename: 'some_random_avatarFilename',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an avatar of a user', async () => {
    const user = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFilename: 'some-name.png',
    });

    expect(user.avatar).toEqual('some-name.png');
  });

  // it('should delete old avatar when updating new one', async () => {
  //   const unlink = jest.spyOn(fs.promises, 'unlink');

  //   const user = await fakeUsersRepository.create({
  //     name: 'John Doe',
  //     email: 'johndoe@example.com',
  //     password: '123456',
  //   });

  //   await updateUserAvatarService.execute({
  //     user_id: user.id,
  //     avatarFilename: 'avatar.jpg',
  //   });

  //   await updateUserAvatarService.execute({
  //     user_id: user.id,
  //     avatarFilename: 'avatar2.jpg',
  //   });

  //   expect(unlink).toBeCalled();
  //   expect(user.avatar).toBe('avatar2.jpg');
  // });
});
