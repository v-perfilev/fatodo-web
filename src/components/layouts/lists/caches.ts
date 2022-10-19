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
