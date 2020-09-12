type ImageStatus = 'no-image' | 'new-image' | 'existing-image';

export interface Image {
  status: ImageStatus,
  url: string,
  blob?: Blob,
}
