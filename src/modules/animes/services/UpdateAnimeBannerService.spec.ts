import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStoregeProvider';
import AppError from '@shared/errors/AppError';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';
import IAnimesRepository from '../repositories/IAnimesRepository';
import UpdateAnimeBannerService from './UpdateAnimeBannerService';

let fakeAnimesRepository: IAnimesRepository;
let fakeStorageProvider: IStorageProvider;
let updateAnimeBannerService: UpdateAnimeBannerService;

describe('UpdateAnimeBannerService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateAnimeBannerService = new UpdateAnimeBannerService(
      fakeAnimesRepository,
      fakeStorageProvider,
    );
  });

  it('should not be able to update an banner of a non existent anime', async () => {
    await expect(
      updateAnimeBannerService.execute({
        anime_id: 'some_random_id',
        avatarFilename: 'some_random_avatarFilename',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update an banner of an anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'description',
      episodesAmount: 10,
      created_by_id: 'me',
    });

    await updateAnimeBannerService.execute({
      anime_id: anime.id,
      avatarFilename: 'some-name.png',
    });

    expect(anime.banner).toEqual('some-name.png');
  });

  it('should delete old banner when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    const saveFile = jest.spyOn(fakeStorageProvider, 'saveFile');

    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'description',
      episodesAmount: 10,
      created_by_id: 'me',
    });

    await updateAnimeBannerService.execute({
      anime_id: anime.id,
      avatarFilename: 'banner.jpg',
    });

    const updatedAnime = await updateAnimeBannerService.execute({
      anime_id: anime.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('banner.jpg');
    expect(saveFile).toHaveBeenCalledWith('avatar2.jpg');
    expect(updatedAnime.banner).toBe('avatar2.jpg');
  });
});
