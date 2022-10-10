export class PromiseUtils {
  public static promiseTimeout = (ms: number, promise: Promise<any>): Promise<any> => {
    const timeout = new Promise((resolve, reject) => {
      const id = window.setTimeout(() => {
        clearTimeout(id);
        reject();
      }, ms);
    });

    return Promise.race([promise, timeout]);
  };
}
