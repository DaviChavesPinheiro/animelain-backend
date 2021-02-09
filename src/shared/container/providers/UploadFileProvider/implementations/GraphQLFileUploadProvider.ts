import { createWriteStream } from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import { FileUpload } from 'graphql-upload';
import crypto from 'crypto';
import IUploadFileProvider from '../models/IUploadFileProvider';
import IUploadFileInfoDTO from '../dtos/IUploadFileInfoDTO';

class GraphQLUploadFileProvider implements IUploadFileProvider {
  public async uploadFile({
    createReadStream,
    filename,
    mimetype,
  }: FileUpload): Promise<IUploadFileInfoDTO> {
    if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
      throw new Error('Only images (png, jpeg) are allowed');
    }

    const fileHash = crypto.randomBytes(10).toString('hex');
    const hashedFileName = `${fileHash}-${filename.split(' ').join('-')}`;

    const uploadPath = path.resolve(uploadConfig.tmpFolder, hashedFileName);
    await new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(uploadPath))
        .on('finish', () => resolve(true))
        .on('error', () => reject(new Error('CreateReadStream Error'))),
    );

    return { fileName: hashedFileName, filePath: uploadPath };
  }
}

export default GraphQLUploadFileProvider;
