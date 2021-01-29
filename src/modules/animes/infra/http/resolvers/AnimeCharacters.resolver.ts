import Character from '@modules/characters/infra/typeorm/entities/Character';
import ListCharacterService from '@modules/characters/services/ListCharacterService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import AnimeCharacter from '../../typeorm/entities/AnimeCharacter';

@Resolver(AnimeCharacter)
class AnimeCharacterResolver {
  @FieldResolver()
  async node(@Root() animeCharacter: AnimeCharacter): Promise<Character> {
    const listCharacterService = container.resolve(ListCharacterService);

    const character = (await listCharacterService.execute({
      id: animeCharacter.characterId,
    })) as Character;

    return classToClass(character);
  }
}

export default AnimeCharacterResolver;
