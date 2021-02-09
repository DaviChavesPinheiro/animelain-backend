import { createWriteStream, statSync } from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import { FileUpload } from 'graphql-upload';
import crypto from 'crypto';
import mime from 'mime';
import imageSize from 'image-size';
import IUploadFileProvider from '../models/IUploadFileProvider';
import IUploadFileInfoDTO from '../dtos/IUploadFileInfoDTO';

class GraphQLUploadFileProvider implements IUploadFileProvider {
  public async uploadFile({
    createReadStream,
    filename,
    encoding,
  }: FileUpload): Promise<IUploadFileInfoDTO> {
    const fileHash = crypto.randomBytes(10).toString('hex');
    const hashedFileName = `${fileHash}-${filename.split(' ').join('-')}`;

    const uploadPath = path.resolve(uploadConfig.tmpFolder, hashedFileName);
    await new Promise((resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(uploadPath))
        .on('finish', () => resolve(true))
        .on('error', () => reject(new Error('CreateReadStream Error'))),
    );

    const mimeType = mime.getType(uploadPath);
    if (mimeType !== 'image/png' && mimeType !== 'image/jpeg') {
      throw new Error('Only images (png, jpeg) are allowed');
    }

    return {
      fileName: hashedFileName,
      filePath: uploadPath,
      mimeType,
      encoding,
      size: statSync(uploadPath).size,
      height: imageSize(uploadPath).height,
      width: imageSize(uploadPath).width,
    };
  }
}

export default GraphQLUploadFileProvider;
