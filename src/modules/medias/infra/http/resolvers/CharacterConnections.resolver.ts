import ListMediaCharactersService from '@modules/medias/services/ListMediaCharactersService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import Media from '../../typeorm/entities/Media';
import MediaCharacter from '../../typeorm/entities/MediaCharacter';
import CharacterConnections from '../schemas/CharacterConnections.schema';

@Resolver(CharacterConnections)
class CharacterConnectionsResolver {
  @FieldResolver()
  async edges(@Root() media: Media): Promise<MediaCharacter[]> {
    const listMediaCharactersService = container.resolve(
      ListMediaCharactersService,
    );

    const mediaCharacters = await listMediaCharactersService.execute({
      mediaId: media.id,
    });

    return classToClass(mediaCharacters);
  }
}

export default CharacterConnectionsResolver;
