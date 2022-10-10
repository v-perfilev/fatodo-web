export class FormUtils {
  static toFormData = (values: any): FormData => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        formData.append(key, values[key]);
      }
    });
    return formData;
  };
}
