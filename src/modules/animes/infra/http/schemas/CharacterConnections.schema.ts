import IConnection from '@shared/infra/http/schemas/Connections.schema';
import { ObjectType, Field } from 'type-graphql';
import AnimeCharacter from '../../typeorm/entities/AnimeCharacter';

@ObjectType({ implements: [IConnection] })
export default class CharacterConnection implements IConnection {
  @Field(() => [AnimeCharacter])
  edges: AnimeCharacter[];
}
