import { ImageType } from '../infra/typeorm/entities/Image';

export default interface ICreateImageDTO {
  fileName: string;
  title?: string;
  width?: number;
  height?: number;
  mimeType?: string;
  encoding?: string;
  size?: number;
  type?: ImageType;
}
