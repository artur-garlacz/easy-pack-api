export function removeEmptyProperties(
  obj: Record<string, any>,
): Record<string, any> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== '' && value !== undefined && value !== null) {
      acc[key] = value;
    }
    return acc;
  }, {});
}
