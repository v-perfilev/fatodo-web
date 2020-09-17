import {IMAGE_API_URL} from '../../constants';

export class ImageUtils {
  private static thumbnailPostfix = '/thumbnail';

  public static getImage = (url: string): string =>
    ImageUtils.handleUrl(url, false);

  public static getThumbnail = (url: string): string =>
    ImageUtils.handleUrl(url, true);

  private static handleUrl = (url: string, isThumbnail: boolean): string =>
    ImageUtils.isUrl(url)
      ? url
      : IMAGE_API_URL + url + isThumbnail && ImageUtils.thumbnailPostfix;

  private static isUrl = (url: string): boolean => {
    try {
      new URL(url);
    } catch (_) {
      return false;
    }
    return true;
  };

}
