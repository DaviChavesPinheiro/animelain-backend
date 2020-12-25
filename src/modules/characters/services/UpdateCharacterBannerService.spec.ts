import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import AppError from '@shared/errors/AppError';
import FakeCharactersRepository from '../repositories/fakes/FakeCharactersRepository';
import ICharactersRepository from '../repositories/ICharactersRepository';
import UpdateCharacterBannerService from './UpdateCharacterBannerService';

let fakeCharactersRepository: ICharactersRepository;
let fakeStorageProvider: IStorageProvider;
let updateCharacterBannerService: UpdateCharacterBannerService;

describe('UpdateCharacterBannerService', () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateCharacterBannerService = new UpdateCharacterBannerService(
      fakeCharactersRepository,
      fakeStorageProvider,
    );
  });

  it('should not be able to update an banner of a non existent anime', async () => {
    await expect(
      updateCharacterBannerService.execute({
        character_id: 'some_random_id',
        avatarFilename: 'some_random_avatarFilename',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an banner of an anime', async () => {
    const anime = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'description',
      age: 10,
    });

    await updateCharacterBannerService.execute({
      character_id: anime.id,
      avatarFilename: 'some-name.png',
    });

    expect(anime.banner).toEqual('some-name.png');
  });

  it('should delete old banner when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const anime = await fakeCharactersRepository.create({
      name: 'Naruto',
      description: 'description',
      age: 10,
    });

    await updateCharacterBannerService.execute({
      character_id: anime.id,
      avatarFilename: 'banner.jpg',
    });

    await updateCharacterBannerService.execute({
      character_id: anime.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('banner.jpg');
    expect(anime.banner).toBe('avatar2.jpg');
  });
});
