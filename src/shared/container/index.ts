import AnimesRepository from '@modules/animes/infra/typeorm/repositories/AnimesRepository';
import IAnimeRepository from '@modules/animes/repositories/IAnimesRepository';
import { container } from 'tsyringe';

container.registerSingleton<IAnimeRepository>(
  'AnimesRepository',
  AnimesRepository,
);
