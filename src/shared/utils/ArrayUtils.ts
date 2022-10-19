type WithId = {id: string};
type WithUserId = {userId: string};

export class ArrayUtils {
  public static updateValueWithId = (array: WithId[], value: WithId): any[] => {
    const arrayCopy = [...array];
    const itemInList = arrayCopy.find((i) => i.id === value.id);
    if (itemInList) {
      const index = arrayCopy.indexOf(itemInList);
      arrayCopy[index] = value;
    }
    return arrayCopy;
  };

  public static updateValueWithUserId = (array: WithUserId[], value: WithUserId): any[] => {
    const arrayCopy = [...array];
    const itemInList = arrayCopy.find((i) => i.userId === value.userId);
    if (itemInList) {
      const index = arrayCopy.indexOf(itemInList);
      arrayCopy[index] = value;
    }
    return arrayCopy;
  };

  public static deleteValue = (array: any[], value: any): any[] => {
    const arrayCopy = [...array];
    const index = arrayCopy.indexOf(value);
    if (index >= 0) {
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };

  public static deleteValueWithId = (array: WithId[], value: WithId): any[] => {
    const arrayCopy = [...array];
    const itemInList = arrayCopy.find((i) => i.id === value.id);
    if (itemInList) {
      const index = arrayCopy.indexOf(itemInList);
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };

  public static deleteValueById = (array: WithId[], id: string): any[] => {
    const arrayCopy = [...array];
    const itemInList = arrayCopy.find((i) => i.id === id);
    if (itemInList) {
      const index = arrayCopy.indexOf(itemInList);
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };

  public static deleteValueWithUserId = (array: WithUserId[], value: WithUserId): any[] => {
    const arrayCopy = [...array];
    const itemInList = arrayCopy.find((i) => i.userId === value.userId);
    if (itemInList) {
      const index = arrayCopy.indexOf(itemInList);
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };

  public static deleteValueByIndex = (array: any[], index: number): any[] => {
    const arrayCopy = [...array];
    if (index >= 0) {
      arrayCopy.splice(index, 1);
    }
    return arrayCopy;
  };

  public static move = (array: any[], oldIndex: number, newIndex): any[] => {
    const clonedArray = [...array];
    if (newIndex >= clonedArray.length) {
      let k = newIndex - clonedArray.length + 1;
      while (k--) {
        clonedArray.push(undefined);
      }
    }
    clonedArray.splice(newIndex, 0, clonedArray.splice(oldIndex, 1)[0]);
    return clonedArray;
  };

  public static clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
  };
}
