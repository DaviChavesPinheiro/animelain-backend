import Character from '@modules/characters/infra/typeorm/entities/Character';
import ListCharacterService from '@modules/characters/services/ListCharacterService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import MediaCharacter from '../../typeorm/entities/MediaCharacter';

@Resolver(MediaCharacter)
class MediaCharacterResolver {
  @FieldResolver()
  async node(@Root() mediaCharacter: MediaCharacter): Promise<Character> {
    const listCharacterService = container.resolve(ListCharacterService);

    const character = (await listCharacterService.execute({
      id: mediaCharacter.characterId,
    })) as Character;

    return classToClass(character);
  }
}

export default MediaCharacterResolver;
