import ListAnimeCharactersService from '@modules/animes/services/ListAnimeCharactersService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import Anime from '../../typeorm/entities/Anime';
import AnimeCharacter from '../../typeorm/entities/AnimeCharacter';
import CharacterConnections from '../schemas/CharacterConnections.schema';

@Resolver(CharacterConnections)
class CharacterConnectionsResolver {
  @FieldResolver()
  async edges(@Root() anime: Anime): Promise<AnimeCharacter[]> {
    const listAnimeCharactersService = container.resolve(
      ListAnimeCharactersService,
    );

    const animeCharacters = await listAnimeCharactersService.execute({
      animeId: anime.id,
    });

    return classToClass(animeCharacters);
  }
}

export default CharacterConnectionsResolver;
