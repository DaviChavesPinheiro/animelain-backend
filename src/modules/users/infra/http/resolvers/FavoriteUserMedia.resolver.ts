import Media from '@modules/medias/infra/typeorm/entities/Media';
import ListMediaService from '@modules/medias/services/ListMediaService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import FavoriteUserMedia from '../../typeorm/entities/FavoriteUserMedia';

@Resolver(FavoriteUserMedia)
class FavoriteUserMediaResolver {
  @FieldResolver()
  async node(@Root() favoriteUserMedia: FavoriteUserMedia): Promise<Media> {
    const listMediaService = container.resolve(ListMediaService);

    const media = (await listMediaService.execute({
      id: favoriteUserMedia.mediaId,
    })) as Media;

    return classToClass(media);
  }
}

export default FavoriteUserMediaResolver;
