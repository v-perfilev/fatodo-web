export class RandomUtils {
  public static generate = (max = 100, min = 1): number => {
    return Math.floor(Math.random() * max) + min;
  };
}
