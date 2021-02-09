export default interface IUploadFileInfoDTO {
  fileName: string;
  filePath: string;
  mimeType: string;
  encoding: string;
  size: number;
  height?: number;
  width?: number;
}
