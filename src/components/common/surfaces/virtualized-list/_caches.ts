export class ListParamsCache {
  previousHeight = 0;
  previousLength = 0;

  public updateHeight(height: number): void {
    if (this.previousHeight < height) {
      this.previousHeight = height;
    }
  }

  public updateLength(length: number): void {
    if (this.previousLength < length) {
      this.previousLength = length;
    }
  }

}
