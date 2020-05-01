import * as Yup from 'yup';

interface AsyncTest {
  name: string;
  message: Yup.TestOptionsMessage;
  test: (value: string) => Promise<boolean> | boolean;
}

export class AsyncValidator {
  private readonly preSchema: Yup.Schema<any>;
  private readonly asyncTest: AsyncTest;

  private previousValue = null;
  private previousResult = true;

  constructor(preSchema, asyncTest) {
    this.preSchema = preSchema;
    this.asyncTest = asyncTest;
  }

  test = async (value: string): Promise<boolean> => {
    let result;
    if (!(await this.preSchema.isValid(value))) {
      result = true;
    } else if (value === this.previousValue) {
      result = this.previousResult;
    } else {
      this.previousValue = value;
      result = await this.asyncTest.test(value);
    }
    this.previousResult = result;
    return result;
  };

  check = (): Yup.Schema<any> => {
    return this.preSchema.concat(Yup.string().test(this.asyncTest.name, this.asyncTest.message, this.test));
  };
}
