export const usernameRegex = /^[A-Za-z\d]+$/;

export const passwordRegex = /^[A-Za-z\d]+$/;
export const passwordStrengthMap = ['(?=.*[A-Z])', '(?=.*[a-z])', '(?=.*\\d)'];
export const passwordStrengthPrefix = '^(';
export const passwordStrengthPostfix = '.*)$';
export const passwordStrengthRegex = new RegExp(
  passwordStrengthPrefix + passwordStrengthMap.reduce((acc, val) => acc + val) + passwordStrengthPostfix
);
