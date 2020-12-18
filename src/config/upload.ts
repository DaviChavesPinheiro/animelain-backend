import path from 'path';
import crypto from 'crypto';
import multer, { StorageEngine, FileFilterCallback } from 'multer';
import { Request } from 'express';
import MulterError from '@shared/errors/MulterError';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'disk';

  tmpFolder: string;
  uploadsFolder: string;

  multer: {
    storage: StorageEngine;
    fileFilter(
      req: Request,
      file: Express.Multer.File,
      callback: FileFilterCallback,
    ): void;
    limits: {
      fileSize: number;
    };
  };

  config: {
    disk: Record<string, unknown>;
    aws: {
      bucket: string;
    };
  };
}

export default {
  driver: 'disk',

  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const fileName = `${fileHash}-${file.originalname}`;

        return callback(null, fileName);
      },
    }),
    fileFilter(req, file, callback) {
      const ext = path.extname(file.originalname);
      if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        callback(new MulterError('Only images are allowed', '400', 'Error'));
      } else {
        callback(null, true);
      }
    },
    limits: {
      fileSize: 1024 * 1024 * 5,
    },
  },

  config: {
    disk: {},
    aws: {
      bucket: 'manganero.site',
    },
  },
} as IUploadConfig;
