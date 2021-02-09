import { FileUpload } from 'graphql-upload';
import IUploadFileInfoDTO from '../dtos/IUploadFileInfoDTO';

export default interface IUploadFileProvider {
  uploadFile(file: FileUpload): Promise<IUploadFileInfoDTO>;
}
