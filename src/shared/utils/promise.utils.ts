export class PromiseUtils {

  public static promiseTimeout = (ms: number, promise: Promise<any>): Promise<any> => {
    let timeout = new Promise((resolve, reject) => {
      let id = window.setTimeout(() => {
        clearTimeout(id);
        reject();
      }, ms);
    });

    return Promise.race([
      promise,
      timeout
    ]);
  };

}
