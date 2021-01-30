import Media from '@modules/medias/infra/typeorm/entities/Media';
import ListMediaService from '@modules/medias/services/ListMediaService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import RecentUserMedia from '../../typeorm/entities/RecentUserMedia';

@Resolver(RecentUserMedia)
class RecentUserMediaResolver {
  @FieldResolver()
  async node(@Root() recentUserMedia: RecentUserMedia): Promise<Media> {
    const listMediaService = container.resolve(ListMediaService);

    const media = (await listMediaService.execute({
      id: recentUserMedia.mediaId,
    })) as Media;

    return classToClass(media);
  }
}

export default RecentUserMediaResolver;
