export class ListParamsCache {
  private previousHeight = 0;
  private previousLength = 0;

  public getPreviousHeight(): number {
    return this.previousHeight;
  }

  public updatePreviousHeight(height: number): void {
    if (this.previousHeight < height) {
      this.previousHeight = height;
    }
  }

  public getPreviousLength(): number {
    return this.previousLength;
  }

  public updateLength(length: number): void {
    if (this.previousLength < length) {
      this.previousLength = length;
    }
  }
}

export class ListKeysCache {
  private keyMap = new Map<number, string>();

  public set(index: number, key: string): void {
    this.keyMap.set(index, key);
  }

  public get(index: number): string {
    return this.keyMap.get(index);
  }

  public clear(): void {
    this.keyMap.clear();
  }
}

export class ListMeasurerCache {
  private defaultHeight: Readonly<number> = 0;
  private measurementMap = new Map<string, number>();

  public setHeight(key: string, height: number): void {
    this.measurementMap.set(key, height);
  }

  public getHeight(key: string): number {
    return this.measurementMap.get(key) || this.defaultHeight;
  }

  public has(key: string): boolean {
    return this.measurementMap.has(key);
  }

  public clear(): void {
    this.measurementMap.clear();
  }
}
