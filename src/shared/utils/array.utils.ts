export class ArrayUtils {
  public static deleteItem = (array: any[], item: any): void => {
    const index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
    }
  };
}
