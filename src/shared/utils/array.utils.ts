export class ArrayUtils {

  public static deleteItem = (array: any[], item: any): void => {
    const index = array.indexOf(item);
    if (index >= 0) {
      array.splice(index, 1);
    }
  };

  public static createdAtComparator = (a: any, b: any): number => {
    return a.createdAt > b.createdAt ? 1 : -1;
  };

  public static uniqueByIdFilter = (item: any, i: number, arr: any[]): any => {
    return arr.findIndex(t => t.id === item.id) === i;
  };

}
