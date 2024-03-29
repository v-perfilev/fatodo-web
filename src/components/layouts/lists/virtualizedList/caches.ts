export class ListKeysCache {
  private keyMap = new Map<number, string>();

  public set(index: number, key: string): void {
    this.keyMap.set(index, key);
  }

  public get(index: number): string {
    return this.keyMap.get(index);
  }

  public keys(): string[] {
    return Array.from(this.keyMap.values());
  }

  public size(): number {
    return this.keyMap.size;
  }

  public clear(index?: number): void {
    if (index !== undefined) {
      this.keyMap.delete(index);
    } else {
      this.keyMap.clear();
    }
  }
}

export class ListMeasurerCache {
  private defaultHeight: Readonly<number> = 100;
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

  public getTotalHeight(): number {
    return Array.from(this.measurementMap.values()).reduce((acc, height) => acc + height, 0);
  }

  public keys(): string[] {
    return Array.from(this.measurementMap.keys());
  }

  public clear(key?: string): void {
    if (key) {
      this.measurementMap.delete(key);
    } else {
      this.measurementMap.clear();
    }
  }
}
