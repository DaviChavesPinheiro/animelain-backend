import ListMediaCharactersService from '@modules/medias/services/ListMediaCharactersService';
import ListMediaCharactersServicePageInfo from '@modules/medias/services/ListMediaCharactersServicePageInfo';
import PageInfo, {
  PaginateMediaInput,
} from '@shared/infra/http/schemas/PageInfo.schema';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import Media from '../../typeorm/entities/Media';
import MediaCharacter from '../../typeorm/entities/MediaCharacter';
import CharacterConnection from '../schemas/CharacterConnection.schema';

interface IRoot {
  media: Media;
  input: PaginateMediaInput;
}

@Resolver(CharacterConnection)
class CharacterConnectionsResolver {
  @FieldResolver()
  async edges(@Root() { media, input }: IRoot): Promise<MediaCharacter[]> {
    const listMediaCharactersService = container.resolve(
      ListMediaCharactersService,
    );

    const mediaCharacters = await listMediaCharactersService.execute({
      mediaId: media.id,
      page: input.page,
      perPage: input.perPage,
    });

    return classToClass(mediaCharacters);
  }

  @FieldResolver(() => PageInfo)
  async pageInfo(@Root() { media, input }: IRoot): Promise<PageInfo> {
    const listMediaCharactersServicePageInfo = container.resolve(
      ListMediaCharactersServicePageInfo,
    );

    const mediaCharactersPageInfo = await listMediaCharactersServicePageInfo.execute(
      {
        mediaId: media.id,
        page: input.page,
        perPage: input.perPage,
      },
    );

    return classToClass(mediaCharactersPageInfo);
  }
}

export default CharacterConnectionsResolver;
