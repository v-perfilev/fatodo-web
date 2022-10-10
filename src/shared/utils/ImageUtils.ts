import {IMAGE_URL} from '../../constants';

export class ImageUtils {
  private static httpUrlPattern = /(http(s)?:\/\/)(.*)/g;
  private static fileUrlPattern = /(file:\/\/)(.*)/g;
  private static thumbnailPostfix = '/thumbnail';

  public static buildImageUri = (url: string, isThumbnail: boolean): string => {
    return IMAGE_URL + url + (isThumbnail ? ImageUtils.thumbnailPostfix : '');
  };

  public static isUrl = (url: string): boolean => {
    const isHttpUrl = url.match(ImageUtils.httpUrlPattern) !== null;
    const isFileUrl = url.match(ImageUtils.fileUrlPattern) !== null;
    return isHttpUrl || isFileUrl;
  };

  public static blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => resolve(reader.result as string));
      reader.readAsBinaryString(blob);
    });
  };
}
