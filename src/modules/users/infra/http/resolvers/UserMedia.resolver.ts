import Media from '@modules/medias/infra/typeorm/entities/Media';
import ListMediaService from '@modules/medias/services/ListMediaService';
import { classToClass } from 'class-transformer';
import { container } from 'tsyringe';
import { FieldResolver, Resolver, Root } from 'type-graphql';
import UserMedia from '../../typeorm/entities/UserMedia';

@Resolver(UserMedia)
class UserMediaResolver {
  @FieldResolver()
  async node(@Root() userMedia: UserMedia): Promise<Media> {
    const listMediaService = container.resolve(ListMediaService);

    const media = (await listMediaService.execute({
      id: userMedia.mediaId,
    })) as Media;

    return classToClass(media);
  }
}

export default UserMediaResolver;
