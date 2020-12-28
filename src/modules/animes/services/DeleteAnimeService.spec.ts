import AppError from '@shared/errors/AppError';
import FakeAnimesRepository from '../repositories/fakes/FakeAnimesRepository';

import DeleteAnimeService from './DeleteAnimeService';

let fakeAnimesRepository: FakeAnimesRepository;
let deleteAnimeService: DeleteAnimeService;

describe('DeleteAnimeService', () => {
  beforeEach(() => {
    fakeAnimesRepository = new FakeAnimesRepository();

    deleteAnimeService = new DeleteAnimeService(fakeAnimesRepository);
  });

  it('should not be able to delete an non existent anime', async () => {
    await expect(
      deleteAnimeService.execute({
        id: 'some-non-existent-anime-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able delete the anime', async () => {
    const anime = await fakeAnimesRepository.create({
      title: 'Naruto',
      description: 'description',
      episodesAmount: 700,
      created_by_id: 'some-user-id',
    });

    await deleteAnimeService.execute({
      id: anime.id,
    });

    expect(await fakeAnimesRepository.findById(anime.id)).toBe(undefined);
  });
});
