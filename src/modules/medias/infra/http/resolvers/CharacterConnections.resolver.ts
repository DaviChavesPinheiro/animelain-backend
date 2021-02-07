import ListMediaCharactersService from '@modules/medias/services/ListMediaCharactersService';
import ListMediaCharactersServicePageInfo from '@modules/medias/services/ListMediaCharactersServicePageInfo';
import PageInfo, {
  PaginateMediaInput,
} from '@shared/infra/http/schemas/PageInfo.schema';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import { IResolverArgs } from '../../../../../@types/IResolvers';
import Media from '../../typeorm/entities/Media';
import MediaCharacter from '../../typeorm/entities/MediaCharacter';
import CharacterConnection from '../schemas/CharacterConnections.schema';

@Resolver(CharacterConnection)
class CharacterConnectionsResolver {
  @FieldResolver()
  async edges(
    @Root() root: IResolverArgs<Media, PaginateMediaInput>,
  ): Promise<MediaCharacter[]> {
    const { root: media } = root;

    const listMediaCharactersService = container.resolve(
      ListMediaCharactersService,
    );

    const mediaCharacters = await listMediaCharactersService.execute({
      mediaId: media.id,
    });

    return classToClass(mediaCharacters);
  }

  @FieldResolver(() => PageInfo)
  async pageInfo(
    @Root() root: IResolverArgs<Media, PaginateMediaInput>,
  ): Promise<PageInfo> {
    const { root: media, input } = root;

    const listMediaCharactersServicePageInfo = container.resolve(
      ListMediaCharactersServicePageInfo,
    );

    const mediaCharacters = await listMediaCharactersServicePageInfo.execute({
      mediaId: media.id,
      page: input.page,
      perPage: input.perPage,
    });

    return classToClass(mediaCharacters);
  }
}

export default CharacterConnectionsResolver;
