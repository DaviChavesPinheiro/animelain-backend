import Character from '@modules/characters/infra/typeorm/entities/Character';
import ListCharacterService from '@modules/characters/services/ListCharacterService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import UserCharacter from '../../typeorm/entities/UserCharacter';

@Resolver(UserCharacter)
class UserCharacterResolver {
  @FieldResolver()
  async node(@Root() userCharacter: UserCharacter): Promise<Character> {
    const listCharacterService = container.resolve(ListCharacterService);

    const character = (await listCharacterService.execute({
      id: userCharacter.characterId,
    })) as Character;

    return classToClass(character);
  }
}

export default UserCharacterResolver;
