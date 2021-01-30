import IConnection from '@shared/infra/http/schemas/Connections.schema';
import { ObjectType, Field } from 'type-graphql';
import MediaCharacter from '../../typeorm/entities/MediaCharacter';

@ObjectType({ implements: [IConnection] })
export default class CharacterConnection implements IConnection {
  @Field(() => [MediaCharacter])
  edges: MediaCharacter[];
}
