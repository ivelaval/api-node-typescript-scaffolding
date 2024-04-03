type Falsy = 0 | '' | false | null | undefined;

export const isValid = <T>(value: T): value is Exclude<T, Falsy> => {
  return value !== undefined && value !== null && value !== '';
};

export const isInvalid = <T>(value: T): value is T & Falsy => {
  return value === undefined || value === null || value === '';
};
