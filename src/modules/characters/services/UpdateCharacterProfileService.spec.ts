import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import AppError from '@shared/errors/AppError';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import ICharactersRepository from '../repositories/ICharactersRepository';
import UpdateCharacterProfileService from './UpdateCharacterProfileService';

let fakeCharactersRepository: ICharactersRepository;
let fakeStorageProvider: IStorageProvider;
let updateCharacterProfileService: UpdateCharacterProfileService;

describe('UpdateCharacterProfileService', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateCharacterProfileService = new UpdateCharacterProfileService(
      fakeCharactersRepository,
      fakeStorageProvider,
    );
  });

  it('should not be able to update an profile of a non existent anime', async () => {
    await expect(
      updateCharacterProfileService.execute({
        character_id: 'some_random_id',
        avatarFilename: 'some_random_avatarFilename',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an profile of an anime', async () => {
    const anime = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'description',
      age: 10,
    });

    await updateCharacterProfileService.execute({
      character_id: anime.id,
      avatarFilename: 'some-name.png',
    });

    expect(anime.profile).toEqual('some-name.png');
  });

  it('should delete old profile when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const anime = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'description',
      age: 10,
    });

    await updateCharacterProfileService.execute({
      character_id: anime.id,
      avatarFilename: 'profile.jpg',
    });

    await updateCharacterProfileService.execute({
      character_id: anime.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('profile.jpg');
    expect(anime.profile).toBe('avatar2.jpg');
  });
});
