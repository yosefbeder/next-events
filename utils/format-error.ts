const formatError = (error: { [key: string]: string }) =>
  Object.entries(error)
    .map(([key, value]) => `'${key}': ${value}`)
    .join('\n');

export default formatError;
