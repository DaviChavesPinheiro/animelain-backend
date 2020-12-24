import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import AppError from '@shared/errors/AppError';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import IAnimesRepository from '../repositories/IAnimesRepository';
import UpdateAnimeProfileService from './UpdateAnimeProfileService';

let fakeAnimesRepository: IAnimesRepository;
let fakeStorageProvider: IStorageProvider;
let updateAnimeProfileService: UpdateAnimeProfileService;

describe('UpdateAnimeProfileService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateAnimeProfileService = new UpdateAnimeProfileService(
      fakeAnimesRepository,
      fakeStorageProvider,
    );
  });

  it('should not be able to update an profile of a non existent anime', async () => {
    await expect(
      updateAnimeProfileService.execute({
        anime_id: 'some_random_id',
        avatarFilename: 'some_random_avatarFilename',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an profile of an anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'description',
      episodesAmount: 10,
      created_by_id: 'me',
    });

    await updateAnimeProfileService.execute({
      anime_id: anime.id,
      avatarFilename: 'some-name.png',
    });

    expect(anime.profile).toEqual('some-name.png');
  });

  it('should delete old profile when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'description',
      episodesAmount: 10,
      created_by_id: 'me',
    });

    await updateAnimeProfileService.execute({
      anime_id: anime.id,
      avatarFilename: 'profile.jpg',
    });

    await updateAnimeProfileService.execute({
      anime_id: anime.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('profile.jpg');
    expect(anime.profile).toBe('avatar2.jpg');
  });
});
